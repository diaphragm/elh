import elh from '../lib'

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

console.log(elh(s3))
