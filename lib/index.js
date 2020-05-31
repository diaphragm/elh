'use strict'

const ESCAPE_INDENT_CHAR = '\0'
const PREFORMATTED_TAGS = ['pre', 'code', 'script', 'style']

const convert = (input, { indentStr, preformattedTags } = {}) => {
  indentStr = indentStr || detectIndent(input)
  preformattedTags = preformattedTags || PREFORMATTED_TAGS
  const preformattedTagRe = new RegExp(`<(${preformattedTags.join('|')})[>\s]`)
  const elh = indentNormalizer(input, indentStr)

  let elhList = []
  let value = '' // buffer
  let depth = 0
  let lineDepth = 0
  // 状態管理用変数
  let indent = false
  let tag = false
  let end = false
  let singleQuote = false
  let doubleQuote = false
  let pre = false
  let line = 1

  for (let i = 0; i < elh.length; i++) {
    const char = elh[i]
    const prev = elhList.slice(-1)[0]

    if (indent) {
      if (char === ESCAPE_INDENT_CHAR) {
        depth += 1
        continue
      } else {
        indent = false
      }
    }

    // 前のタグが<pre>タグの場合
    if (prev && prev.value.match(preformattedTagRe)) {
      pre = true
    }
    if (pre) {
      if (char === '\n') {
        // <pre>直後の''はbufferに入れない
        if (!(prev.tag && depth == prev.depth && value == '')) {
          elhList.push({ depth, lineDepth, lineDepth, value, tag, end, pre, line })
        }
        value = ''
        depth = 0
        lineDepth = 0
        indent = true
        line += 1
        continue
      }
      if (depth < prev.depth) {
        if (value.length > 0) { elhList.push({ depth, lineDepth, lineDepth, value, tag, end, pre, line }) }
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
            if (value.length > 0) { elhList.push({ depth, lineDepth, lineDepth, value, tag, end, pre, line }) }
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
          if (value.slice(-1) != '\\') {
            doubleQuote = !doubleQuote
          }
          value += char
          break
        case '\'':
          if (value.slice(-1) != '\\') {
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
          if (value.length > 0) { elhList.push({ depth, lineDepth, lineDepth, value, tag, end, pre, line }) }
          value = ''
          depth = 0
          lineDepth = 0
          indent = true
          line += 1
          break
        case '<':
          if (value.length > 0) { elhList.push({ depth, lineDepth, lineDepth, value, tag, end, pre, line }) }
          value = char
          tag = true
          end = (elh[i + 1] === '/')
          break
        default:
          value += char
      }
    }
  }
  if (value.length > 0) { elhList.push({ depth, lineDepth, lineDepth, value, tag, end }) }

  // elhList.forEach((node) =>{
  //   node.depth = node.depth + node.lineDepth
  //   delete node.lineDepth
  // })

  let html = ''
  let buffer = []
  for (let i = 0; i < elhList.length; i++) {
    const node = elhList[i]
    const prev = elhList[i - 1] || {}
    const next = elhList[i + 1] || {}
    node.indentSize = node.depth
    const { depth, lineDepth, value, tag, end, pre, line, indentSize } = node

    // preはそのまま吐き出して次へ
    if (pre) {
      html += indentStr.repeat(indentSize) + value + '\n'
      prev = node
      continue
    }

    // インデント戻ったらbuffer吐き出す
    if (!AisDepthOrEqThanB(node, prev)) {
      while (buffer[buffer.length - 1] && AisDepthOrEqThanB(buffer[buffer.length - 1], node)) {
        const { value, indentSize } = buffer.pop()
        html += indentStr.repeat(indentSize) + genEndtag(value) + '\n'
      }
    }

    // 閉じタグは勝手に入るので無視する
    if (tag && end) { continue }
    if (tag) {
      // 子要素があるときはbufferに入れる
      if (AisDepthThanB(next, node) || next.pre) {
        // 直前が同じ行でテキストノードの場合は除外する
        if (!(line == prev.line && !prev.tag)) {
          buffer.push(node)
        }
      }
    }

    html += indentStr.repeat(indentSize) + value + '\n'
  }
  // 残ったbuffer吐き出す
  depth = 0
  while (buffer.length > 0) {
    const { value, indentSize } = buffer.pop()
    html += indentStr.repeat(indentSize) + genEndtag(value) + '\n'
  }

  return html
}

const AisDepthThanB = (nodeA, nodeB) => {
  if (nodeA.depth > nodeB.depth) { return true }
  if (nodeA.depth == nodeB.depth) {
    if (nodeA.lineDepth > nodeB.lineDepth) {
      return true
    }
  }
  return false
}

const AisDepthOrEqThanB = (nodeA, nodeB) => {
  if (nodeA.depth > nodeB.depth) { return true }
  if (nodeA.depth == nodeB.depth) {
    if (nodeA.lineDepth >= nodeB.lineDepth) {
      return true
    }
  }
  return false
}

const genEndtag = (starttag) => {
  const tagname = starttag.match(/<([^\s>]+)/)[1]
  const endtag = `</${tagname}>`
  return endtag
}

const indentNormalizer = (code, space) => {
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

module.exports = convert
