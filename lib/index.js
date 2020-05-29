'use strict'

const ESCAPE_INDENT_CHAR = '\0'

export default (input, indentChar = null) => {
  indentChar = indentChar || detectIndent(input)
  const elh = indentNormalizer(input, indentChar)

  let elhList = []
  let value = '' // buffer
  let depth = 0
  let lineDepth = 0
  let indent = false
  let tag = false
  let end = false
  let singleQuote = false
  let doubleQuote = false

  for (let i = 0; i < elh.length ; i++) {
    const char = elh[i]

    if (indent) {
      if (char === ESCAPE_INDENT_CHAR) {
        depth += 1
        continue
      } else {
        indent = false
      }
    }
    if (tag) {
      switch (char) {
        case '>':
          value += char
          if (!singleQuote && !doubleQuote) {
            lineDepth += end ? -1 : 0
            if (value.length > 0) { elhList.push({depth, lineDepth, value, tag, end}) }
            lineDepth += end ? 0 : 1
            value = ''
            tag = false
            end = false
          }
          break
        case ESCAPE_INDENT_CHAR:
          value += indentChar
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
          if (value.length > 0) { elhList.push({depth, lineDepth, value, tag, end}) }
          value = ''
          depth = 0
          lineDepth = 0
          indent = true
          break
        case '<':
          if (value.length > 0) { elhList.push({depth, lineDepth, value, tag, end}) }
          value = char
          tag = true
          end = (elh[i + 1] === '/')
          break
        default:
          value += char
      }
    }
  }
  if (value.length > 0) { elhList.push({ depth, lineDepth, value, tag, end }) }
console.log(elhList)
  elhList.forEach((node) =>{
    node.depth = node.depth + node.lineDepth
    delete node.lineDepth
  })

  let html = ''
  let buffer = []
  let prev = {}
  for (let i = 0; i < elhList.length; i++) {
    const node = elhList[i]
    const { depth, value, tag, end } = node

    // インデント戻ったらbuffer吐き出す
    if (depth < prev.depth) {
      while (buffer[buffer.length - 1] && buffer[buffer.length - 1].depth >= depth) {
        const { depth, value, tag, end } = buffer.pop()
        html += indentChar.repeat(depth) + genEndtag(value) + '\n'
      }
    }

    // 閉じタグは勝手に入るので無視する
    if (tag && end) { continue }
    if (tag) {
      // 子要素があるときはbufferに入れる
      if (elhList[i + 1] && elhList[i + 1].depth > depth) {
        buffer.push(node)
      }
    }

    html += indentChar.repeat(depth) + value + '\n'

    prev = node
  }
  // 残ったbuffer吐き出す
  depth = 0
  while (buffer.length > 0 && buffer[buffer.length - 1].depth >= depth) {
    const { depth, value, tag, end } = buffer.pop()
    html += indentChar.repeat(depth) + genEndtag(value) + '\n'
  }

  return html
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
