# Auro Web Component Browser Support

Auro Web components are developed to be compliant with Alaska Airlines' browser support matrix as published at the time of this project's publication.

If at any such time it is discovered that there is an issue with this component's support of any popular browser in use, please submit an issue and explain the discovered issue to the best of your ability.

## Browser Support Matrix

Alaska Airlines currently supports the following browsers for the delivery of stateless web components.

<small>Browsers that engineers are required to dev and test against:</small>

| Browser | Version         | Operating System                 |
| ------- | --------------- | -------------------------------- |
| Chrome  | Current release | Windows, macOS, iOS, Android     |
| Safari  | Current release | macOS, iOS                       |
| Firefox | Current release | Windows, macOS, Android          |
| Edge†   | Stable release  | Windows 7, Windows 8, Windows 10 |

† Chromium based Microsoft Edge was released on January 15, 2020. Edge 18, the final version based on [EdgeHTML](https://en.wikipedia.org/wiki/EdgeHTML) on Windows 10 machines only, is NOT supported.

#### Browser support for HTML Web Components

| Feature         | Chrome | Opera  | Safari | Firefox | MS Edge |
| --------------- | ------ | ------ | ------ | ------- | ------- |
| HTML Templates  | Stable | Stable | Stable | Stable  | Stable  |
| Custom Elements | Stable | Stable | Stable | Stable  | Stable  |
| Shadow DOM      | Stable | Stable | Stable | Stable  | Stable  |
| ES Modules      | Stable | Stable | Stable | Stable  | Stable  |

-- source: [webcomponents.org](https://www.webcomponents.org/)

#### Browser support for CSS Custom Properties (variables)

| Browser | Version         | Custom Selectors |
| ------- | --------------- | ---------------- |
| Chrome  | Current release | Yes              |
| Safari  | Current release | Yes              |
| Firefox | Current release | Yes              |
| Edge    | Current release | Yes              |
