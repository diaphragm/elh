const elh = require('../lib')

const s1 = `
<template>
  <v-app>
    <v-app-bar app="app" dense="dense" flat="flat">
      <img src="@/assets/images/logo.svg" />
    </v-app-bar>
    <v-content class="default-background-color">
      <v-container class="error-body">
        <v-layout justify-center="justify-center">
          <p class="error-title">ご指定のページは存在しません</p>
        </v-layout>
        <v-layout justify-center="justify-center">
          <p>
            指定されたページは存在しません、お問い合わせ頂くかブラウザの「戻る」ボタンをクリックして戻ってください
          </p>
        </v-layout>
        <v-layout justify-center="justify-center">
          <v-btn color="nomadproperty" :href="top">TOPに戻る</v-btn>
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
</template>
`

const s2 = `
<template>
  <v-app>
    <v-app-bar app="app" dense="dense" flat="flat">
      <img src="@/assets/images/logo.svg" />
    </v-app-bar>
    <v-content class="default-background-color">
      <v-container class="error-body">
        <v-layout justify-center="justify-center">
          <p class="error-title">ご指定のページは存在しません</p>
        </v-layout>
        <v-layout justify-center="justify-center">
          <p>
            指定されたページは存在しません、お問い合わせ頂くかブラウザの「戻る」ボタンをクリックして戻ってください
          </p>
        </v-layout>
        <v-layout justify-center="justify-center">
          <v-btn color="nomadproperty" :href="top">TOPに戻る</v-btn>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="default-background-color">
      <v-layout justify-center="justify-center">
        <p class="footer-copyright">
          Copyright &copy; 2015 aaa rights reserved.
        </p>
      </v-layout>
    </v-footer>
  </v-app>
</template>
`


const s3 = `


  <template>
    <v-app>
      <v-app-bar
        app="app" dense="dense" flat="flat">
        <img src="@/assets/images/logo.svg" />
      <v-content class="default-background-color">
        <v-container class="error-body">
          <v-layout justify-center="justify-center">
            <p class="error-title">ご指定のページは存在しません</p>
          <v-layout justify-center="justify-center">
            <p>
              指定されたページは存在しません
              お問い合わせ頂くかブラウザの「戻る」ボタンをクリックして戻ってください
            <a><button>リンクリンク
            <a><input>
              インプット<strong>STRONG</strong>インプット
            <p>あいうえお<italic>
              イタリック
              <v-layout justify-center="justify-center">
            <v-btn color="nomadproperty" :href="top">TOPに戻る</v-btn>
          </v-layout>
      <v-footer class="default-background-color">
        <v-layout justify-center="justify-center">
          <p class="footer-copyright">
            Copyright &copy; 2015 aaa ights reserved.
            <div>A<p>B<a>aiueo<strong>AIUEO</strong>D</a>E</p></div>
`

const s4 = `
<template>
  <v-app>
    <v-app-bar app="app" dense="dense" flat="flat">
      <img src="@/assets/images/logo.svg" />
      <img src="@/assets/images/hoge.svg" />
    <v-content class="default-background-color">
      <v-container class="error-body">
        <v-layout justify-center="justify-center">
          <p class="error-title">ご指定のページは存在しません</p>
        <v-layout2 justify-center="justify-center">
          <p>
            あいうえお<br>
            かきくけこ
    <v-footer>
      copyright
`

const s5 = `
<template>
  <v-app>
    <v-app-bar app="app" dense="dense" flat="flat">
      <img src="@/assets/images/logo.svg" />
      <img src="@/assets/images/hoge.svg" />
    <v-content class="default-background-color">
`

const s6 = `<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="alignment"
          :justify="justify"
          class="grey lighten-5"
          style="height: 300px;"
        >
          <v-card
            v-for="n in 3"
            :key="n"
            class="ma-3 pa-6"
            outlined
            tile
          >
            Column
      <v-col cols="12">
        <v-row justify="center">
          <v-col
            cols="6"
            md="2"
          >
            <v-select
              v-model="alignment"
              :items="alignmentsAvailable"
              label="Align"
            ></v-select>

          <v-col
            cols="6"
            md="2"
          >
            <v-select
              v-model="justify"
              :items="justifyAvailable"
              label="Justify"
            ></v-select>

  <script>
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
`

const s7 = `
<body>
  hello
  <div onclick="alert(1 < 2)">
    bbb
  <div onclick="alert(1 > 2)">
    aaa
`

const s8 = `
<body>
  <pre>
    <samp>あなたは、ある大きな白い家の玄関の前に立っています。
    目の前に小さな郵便受けがあります。

    ></samp> <kbd>open mailbox</kbd>

    <samp>郵便受けを開けました:
    一枚のチラシがあります。

    ></samp>
  プレ終了
`

const s9 = `
<pre>aoiep
  <samp>あなたは、ある大きな白い家の玄関の前に立っています。
  目の前に小さな郵便受けがあります。
が
<pre>
  aoiep
  <samp>あなたは、ある大きな白い家の玄関の前に立っています。
  目の前に小さな郵便受けがあります。
になるのはもう仕様とする
`

const s10 = `
<div> pugじゃかけない書き方
  <div0><div1><div2><p>
    インラインでタグが重ねられる
    重ねられる！！！！
    改行だめ<br>やん？？
`

const s11 = `
<root>
  <div>これは書きたい
  <div0><div1><div2><p>
    インラインでタグは重ねたい
  <div>こういうことも<br>しちゃいたい
  <a> anchro
  <div><p>あああ<br>テキストノードの間だけ無視するか？
  テキストノード出現後はlineDepthを無視するとか
  <div>こういのはべつにいいかな<p>
    あいうえお
  <div>いじわるな<v-comp />かんじで
`

const s12 = `
<root>
  <div>こういうことも<br>しちゃいたい
  <a> anchro
<div>
  aaa
`
const s13 = `
<v-toolbar >
  <v-app-bar-nav-icon> ←閉じタグは勝手に入れてほしい
  <v-spacer />
  <v-toolbar-title>Title</v-toolbar-title>
  <v-spacer />

  <v-btn icon> <v-icon> mdi-magnify ←タグ間にスペース入ってても無視してほしい

`

console.log(elh(s11))
