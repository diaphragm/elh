![title](https://raw.githubusercontent.com/diaphragm/elh/images/title.png)

# elh

`elh` is a static HTML template engine.
It was mainly developed to ease the writing of Vue.js templates.

## Motivation
```
<v-container>
  <v-row>
    <v-col>
      <v-btn>
        <v-icon>
           mdi-heart
        </v-icon>      <--
      </v-btn>         <--
    </v-col>           <--  REALY REQUIRE ????
  </v-row>             <--
</v-container>         <--
```

## Installation

##### yarn
`yarn add -D elh-loader`

##### webpack.config.js
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.elh$/i,
        use: 'elh-loader'
      }
    ]
  }
}
```

#### nuxt.config.js.

```
export default {
  build: {
    extend(config) {
      config.module.rules.push(
        {
          test: /\.elh$/i,
          use: 'elh-loader'
        }
      )
    }
  }
}
```

## Usage

##### Vue.js single file component
```
<template lang="elh">
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
</template>
```

The above code will be rendered as complete html.

## Why not pug?

##### pug
```
v-cotainer
  v-row
    v-col
      v-btn
        v-icon mdi-heart
  v-row
    v-col
      v-btn
        v-icon mdi-star
  v-row
    v-col
      v-btn
        v-icon mdi-autorenew
```

##### elh
```
<v-container>
  <v-row><v-col><v-btn><v-icon> mdi-heart
  <v-row><v-col><v-btn><v-icon> mdi-star
  <v-row><v-col><v-btn><v-icon> mdi-autorenew
```

Indentation is often too deep in the case of pug.

The concept of elh is **not** indent-based.
The concept is to omit closing tags.


## Examples

##### Vuetify
```
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
```
↓
```
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
```

##### with attribute
```
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  <v-content class="default-background-color">
```
↓
```
<v-app>
  <v-app-bar app="app" dense="dense" flat="flat">
    <img src="@/assets/images/logo.svg" />
    <img src="@/assets/images/hoge.svg" />
  </v-app-bar>
  <v-content class="default-background-color">
  </v-content>
</v-app>
```
