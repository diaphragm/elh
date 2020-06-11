const assert = require('assert')
const elh = require('../lib')

const elhAssert = (actual, expect) => {
  it('should be equal', () => {
    assert.equal(elh(actual).trim(), expect.trim())
  })
}

describe('Template', () => {
elhAssert(`
<div>
  <p>HELLO
`, `
<div>
  <p>
    HELLO
  </p>
</div>
`)})

describe('vuetify', () => {
elhAssert(`
<v-app>
  <v-app-bar>
    <titel> TITEL
  <v-content>
    <v-container>
      <v-row>
        <v-col>
          <v-btn><v-icon> HELLO!
        <v-col>
          <v-btn><v-icon> WORLD!
  <v-footer>
    FOOTER
`, `
<v-app>
  <v-app-bar>
    <titel>
       TITEL
    </titel>
  </v-app-bar>
  <v-content>
    <v-container>
      <v-row>
        <v-col>
          <v-btn>
            <v-icon>
               HELLO!
            </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn>
            <v-icon>
               WORLD!
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
  <v-footer>
    FOOTER
  </v-footer>
</v-app>
`)})

describe('with attribute', () => {
elhAssert(`
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
  <v-content class="default-background-color">
    <v-container class="error-body">
      <v-layout justify-center="justify-center">
        <p class="error-title">ご指定のページは存在しません</p>
      <v-layout justify-center="justify-center">
        <p>
          指定されたページは存在しません、お問い合わせ頂くかブラウザの「戻る」ボタンをクリックして戻ってください
      <v-layout justify-center="justify-center">
        <v-btn color="property" :href="top">TOPに戻る
  <v-footer class="default-background-color">
    <v-layout justify-center="justify-center">
      <p class="footer-copyright">
        Copyright &copy; 2015 aaa ights reserved.
`, `
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
  </v-app-bar>
  <v-content class="default-background-color">
    <v-container class="error-body">
      <v-layout justify-center="justify-center">
        <p class="error-title">
          ご指定のページは存在しません
        </p>
      </v-layout>
      <v-layout justify-center="justify-center">
        <p>
          指定されたページは存在しません、お問い合わせ頂くかブラウザの「戻る」ボタンをクリックして戻ってください
        </p>
      </v-layout>
      <v-layout justify-center="justify-center">
        <v-btn color="property" :href="top">
          TOPに戻る
        </v-btn>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer class="default-background-color">
    <v-layout justify-center="justify-center">
      <p class="footer-copyright">
        Copyright &copy; 2015 aaa ights reserved.
      </p>
    </v-layout>
  </v-footer>
</v-app>
`)})

describe('self closing tag', () => {
elhAssert(`
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  <v-content class="default-background-color">
`, `
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  </v-app-bar>
  <v-content class="default-background-color">
  </v-content>
</v-app>
`)})

describe('quote', () => {
elhAssert(`
<body>
  hello
  <div onclick="alert(1 < 2)">
    bbb
  <div onclick="alert(1 > 2)">
    aaa
`, `
<body>
  hello
  <div onclick="alert(1 < 2)">
    bbb
  </div>
  <div onclick="alert(1 > 2)">
    aaa
  </div>
</body>
`)})

describe('preformed', () => {
  elhAssert(`
<body>
  <pre>
    <samp>AAAAAAAAAAAAAAAAAAAAAAAA
    BBBBBBBBBBBBBBBBBBBB

    ></samp> <foo>CCCCCCCCCCCC</foo>

        <samp> INDENTED
    DDDDDDDDD

    ></samp>
  ENDENDEND
`, `
<body>
  <pre>
    <samp>AAAAAAAAAAAAAAAAAAAAAAAA
    BBBBBBBBBBBBBBBBBBBB

    ></samp> <foo>CCCCCCCCCCCC</foo>

        <samp> INDENTED
    DDDDDDDDD

    ></samp>
  </pre>
  ENDENDEND
</body>
`)})

describe('line nested preformed', () => {
elhAssert(`
<body>
  <div1><div2>PREFORMED<pre>
    <samp>
      AAAAAAAAAAAAAAAAAAAAAAAA
      BBBBBBBBBBBBBBBBBBBB
    </samp>
  END
`, `
<body>
  <div1>
    <div2>
      PREFORMED
      <pre>
    <samp>
      AAAAAAAAAAAAAAAAAAAAAAAA
      BBBBBBBBBBBBBBBBBBBB
    </samp>
  </pre>
    </div2>
  </div1>
  END
</body>
`)})

describe('inline nest', () => {
elhAssert(`
<root>
  <div>これは書きたい
  <div0><div1><div2><p>
    インラインでタグは重ねたい
  <div>こういうことも<br>しちゃいたい
  <a> ANCHOR
  <div><p>あああ<br>いいいいいい
  ううううううううううううううううううううううう
  <div>ええええええええええええええ<p>
    あいうえお
  <div>SELF<v-comp />CLOSING
  <div>  WITH  !<v-comp /> SPACING
`, `
<root>
  <div>
    これは書きたい
  </div>
  <div0>
    <div1>
      <div2>
        <p>
          インラインでタグは重ねたい
        </p>
      </div2>
    </div1>
  </div0>
  <div>
    こういうことも
    <br>
    しちゃいたい
  </div>
  <a>
     ANCHOR
  </a>
  <div>
    <p>
      あああ
      <br>
      いいいいいい
    </p>
  </div>
  ううううううううううううううううううううううう
  <div>
    ええええええええええええええ
    <p>
      あいうえお
    </p>
  </div>
  <div>
    SELF
    <v-comp />
    CLOSING
  </div>
  <div>
      WITH  !
    <v-comp />
     SPACING
  </div>
</root>
`)})

describe('List', () => {
  elhAssert(`
<div>
  <ul>
    <li> AAA
    <li> BBB
    <li> CCC
    <li> DDD
`, `
<div>
  <ul>
    <li>
       AAA
    </li>
    <li>
       BBB
    </li>
    <li>
       CCC
    </li>
    <li>
       DDD
    </li>
  </ul>
</div>
`)
})

describe('last non self close tag closing', () => {
  elhAssert(`
<div>
  <v-divider>
  <v-divider>
  <v-divider>
`, `
<div>
  <v-divider>
  </v-divider>
  <v-divider>
  </v-divider>
  <v-divider>
  </v-divider>
</div>
`)
})
