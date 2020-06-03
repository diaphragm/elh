const assert = require('assert')
const elh = require('../lib')

describe('Template', () => {
it('should be equal', () => {
assert.equal(elh(`
<div>
  <p>HELLO
`).trim(), `
<div>
  <p>
    HELLO
  </p>
</div>`
.trim())
  })
})

describe('vuetify', () => {
it('should be equal', () => {
assert.equal(elh(`
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
`).trim(), `
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
`.trim())})})

describe('with attribute', () => {
  it('should be equal', () => {
    assert.equal(elh(`
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
`).trim(), `
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
`.trim())
  })
})

describe('self closing tag', () => {
it('should be equal', () => {
assert.equal(elh(`
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  <v-content class="default-background-color">
`).trim(), `
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  </v-app-bar>
  <v-content class="default-background-color">
  </v-content>
</v-app>
`.trim())
  })
})

describe('quote', () => {
it('should be equal', () => {
assert.equal(elh(`
<body>
  hello
  <div onclick="alert(1 < 2)">
    bbb
  <div onclick="alert(1 > 2)">
    aaa
`).trim(), `
<body>
  hello
  <div onclick="alert(1 < 2)">
    bbb
  </div>
  <div onclick="alert(1 > 2)">
    aaa
  </div>
</body>
`.trim())
  })
})

describe('preformed', () => {
it('should be equal', () => {
assert.equal(elh(`
<body>
  <pre>
    <samp>あなたは、ある大きな白い家の玄関の前に立っています。
    目の前に小さな郵便受けがあります。

    ></samp> <kbd>open mailbox</kbd>

      <samp>郵便受けを開けました:
    一枚のチラシがあります。

    ></samp>
  プレ終了
`).trim(), `
<body>
  <pre>
    <samp>あなたは、ある大きな白い家の玄関の前に立っています。
    目の前に小さな郵便受けがあります。

    ></samp> <kbd>open mailbox</kbd>

      <samp>郵便受けを開けました:
    一枚のチラシがあります。

    ></samp>
  </pre>
  プレ終了
</body>
`.trim())
  })
})

describe('inline nest', () => {
it('should be equal', () => {
assert.equal(elh(`
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
`).trim(), `
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
`.trim())
  })
})
