'use strict'

const ESCAPE_INDENT_CHAR = '\0'
const PREFORMATTED_TAGS = [
  'pre',
  'script',
  'style'
]
const SELF_CLOSING_TAGS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

module.exports = (input, { indentStr, preformattedTags, selfClosingTags } = {}) => {
  indentStr = indentStr || detectIndent(input)
  preformattedTags = preformattedTags || PREFORMATTED_TAGS
  selfClosingTags = selfClosingTags || SELF_CLOSING_TAGS

  const elh = normalizeIndentStr(input, indentStr)
  const elements = parseElement(elh, indentStr, preformattedTags)
  const rejected = rejectBlank(elements)
  const treated = treatSelfClosing(rejected, selfClosingTags)
  const nodeData = normalizeDepth(treated)
  const html = generateHtml(nodeData, indentStr, selfClosingTags)

  return html
}

const genEndtag = (starttag) => {
  const tagname = starttag.match(/<([^\s>]+)/)[1]
  const endtag = `</${tagname}>`
  return endtag
}

const normalizeIndentStr = (code, space) => {
  const re = new RegExp(`(^|${ESCAPE_INDENT_CHAR})(?:${space})+?`, 'gm')
  let ret = code.replace((new RegExp(ESCAPE_INDENT_CHAR, 'g')), '')
  do {
    ret = ret.replace(re, `$1${ESCAPE_INDENT_CHAR}`)
  } while (re.test(ret))
  return ret
}

const detectIndent = (code) => {
  const ret = code.match(/^[\t ]+/m)
  if (ret) {
    return ret[0]
  } else {
    throw new Error('No indent is detected.')
  }
}

const last = (array) => {
  return array[array.length - 1]
}

const parseElement = (elh, indentStr, preformattedTags) => {
  const re = new RegExp(`<(${preformattedTags.join('|')})[>\s]`, 'i')

  let elements = []
  let value = '' // buffer
  let indentDepth = 0
  let lineDepth = 0
  let line = 1
  // 状態管理用変数
  let indent = false
  let tag = false
  let end = false
  let singleQuote = false
  let doubleQuote = false
  let pre = false

  for (let i = 0; i < elh.length; i++) {
    const char = elh[i]
    const prev = last(elements)

    if (indent) {
      if (char === ESCAPE_INDENT_CHAR) {
        indentDepth += 1
        continue
      } else {
        indent = false
      }
    }

    // 前のタグが<pre>タグの場合
    if (prev && re.test(prev.value)) {
      pre = true
    }
    if (pre) {
      if (char === '\n') {
        // <pre>直後の''はbufferに入れない
        if (!(prev.tag && indentDepth === prev.indentDepth && value === '')) {
          elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })
        }
        value = ''
        indentDepth = 0
        lineDepth = 0
        indent = true
        line += 1
        continue
      }
      if (indentDepth < prev.indentDepth) {
        elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })
        value = ''
        pre = false
      }
      value += char
      continue
    }

    if (tag) {
      switch (char) {
        case '>':
          value += char
          if (!singleQuote && !doubleQuote) {
            lineDepth += end ? -1 : 0
            elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })
            lineDepth += end ? 0 : 1
            value = ''
            tag = false
            end = false
          }
          break
        case ESCAPE_INDENT_CHAR:
          value += indentStr
          break
        case '\"':
          if (!value.endsWith('\\')) {
            doubleQuote = !doubleQuote
          }
          value += char
          break
        case '\'':
          if (!value.endsWith('\\')) {
            singleQuote = !singleQuote
          }
          value += char
          break
        default:
          value += char
      }
    } else {
      switch (char) {
        case '\n':
          elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })
          value = ''
          indentDepth = 0
          lineDepth = 0
          indent = true
          line += 1
          break
        case '<':
          elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })
          value = char
          tag = true
          end = (elh[i + 1] === '/')
          break
        default:
          value += char
      }
    }
  }
  elements.push({ indentDepth, lineDepth, line, value, tag, end, pre, line })

  return elements
}

// self closingなタグはテキスト扱いにする
const treatSelfClosing = (elements, selfClosingTags) => {
  const re = new RegExp(`<(${selfClosingTags.join('|')})[>\s]`)
  return elements.map((el) => {
    if (el.tag) {
      if (el.value.endsWith('/>') || re.test(el.value)) {
        el.tag = false
      }
    }
    return el
  })
}

const rejectBlank = (elements) => {
  return elements.filter(el => el.pre || el.value.trim().length > 0)
}

// indentDepthとlineDepthをもとにdepthに統合する
const normalizeDepth = (elements) => {
  let ret = []
  let buffer = []
  let virtualDepth = 0
  for (let i = 0; i < elements.length; i++) {
    const prev = elements[i-1] || {depth: 0}
    const node = elements[i]

    // 同じ行の処理
    if (prev.line === node.line) {
      // 同じ行でも直前がテキストだったらdepth下げない
      if (prev.tag) {
        virtualDepth = prev.depth + 1
      }
    // 改行後の処理
    } else {
      // 見た目でインデント下がってたら今の行の先頭の要素だけバッファーに記録してdepth下げる
      if (prev.indentDepth < node.indentDepth) {
        buffer.push(node)
        virtualDepth = prev.depth + 1
      // 見た目でインデント戻ってたら以前にあった先頭の要素までdepthとバッファー戻す
      } else if (prev.indentDepth > node.indentDepth) {
        while (last(buffer) && (last(buffer).indentDepth > node.indentDepth)) {
          buffer.pop()
        }
        virtualDepth = node.indentDepth
      // 見た目でインデント同じだったら直前のバッファと同じdepth
      } else {
        virtualDepth = last(buffer) ? last(buffer).depth : 0
      }
    }

    node.depth = virtualDepth
    ret.push(node)
  }

  return ret
}

const generateHtml = (elements, indentStr) => {
  let html = ''
  let buffer = []
  for (let i = 0; i < elements.length; i++) {
    const node = elements[i]
    const prev = elements[i - 1] || {}
    const next = elements[i + 1] || {}
    const { depth, value, tag, end, pre } = node

    // preはそのまま吐き出して次へ
    if (pre) {
      html += indentStr.repeat(depth) + value + '\n'
      continue
    }

    // インデント戻ったらbuffer吐き出す
    if (node.depth <= prev.depth) {
      while (last(buffer) && (last(buffer).depth >= node.depth)) {
        const { value, depth } = buffer.pop()
        html += indentStr.repeat(depth) + genEndtag(value) + '\n'
      }
    }

    // 閉じタグは勝手に入るので描写せず次へ
    if (tag && end) { continue }
    // タグだったらバッファーに追加
    if (tag) {
      buffer.push(node)
    }

    html += indentStr.repeat(depth) + value + '\n'
  }
  // 残ったbuffer吐き出す
  while (buffer.length > 0) {
    const { value, depth } = buffer.pop()
    html += indentStr.repeat(depth) + genEndtag(value) + '\n'
  }

  return html
}
