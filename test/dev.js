const elh = require('../lib')

a = []

a.push(`
<body>
  <pre>
    <samp>AAAAAAAAAAAAAAAAAAAAAAAA
    BBBBBBBBBBBBBBBBBBBB

    ></samp> <foo>CCCCCCCCCCCC</foo>

        <samp> INDENTED
    DDDDDDDDD

    ></samp>
  プレ終了
`)

a.push(`
<body>
  <div1><div2>PREFORMED<pre>
    <samp>
      AAAAAAAAAAAAAAAAAAAAAAAA
      BBBBBBBBBBBBBBBBBBBB
    </samp>
  END
`)

a.forEach(s => console.log(elh(s)))
