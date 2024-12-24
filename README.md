# ICONPICKER
Vanilla Javascript Icon Picker (made with Typescript)

## [>>> Demo <<<](https://davidticona.com/demos/javascript-iconpicker/)

## Features

* Vanilla Javascript
* Fully customizable (custom iconset, custom style)
* Dark/Light mode
* Lightweight (24 KB gzipped)

## Installation

### Via NPM

```
npm i @davicotico/iconpicker
```

## Usage

Using a div element (inline)

```html
<div style="250px" id="element-id"></div>
```

Or using a button (open a popover)

```html
<button id="element-id" class="btn btn-primary"></button>
```

```javascript
import { IconPicker } from "@davicotico/iconpicker";
import '@davicotico/iconpicker/css/styles.css';
import '@davicotico/iconpicker/css/themes/dark.css';
import '@davicotico/iconpicker/css/themes/light.css';
import { bi } from '@davicotico/iconpicker/iconsets/bi'; /* bootstrap iconset */
// or
/*const iconset = ['fa-solid fa-home', 'fa-solid fa-star',...]; */
const iconPicker = new IconPicker('element-id', bi, 20, { iconButtonClass: 'btn btn-secondary' });
iconPicker.onChange((params) => {
  console.log(params.icon);
});
iconPicker.mount();
```
## Options

```
{
  iconButtonClass: string;
  selectedIconButtonClass: string;
  navButtonClass: string;
  inputPlaceholder: string;
  inputClass: string;
  arrowPrevIconClass: string;
  arrowNextIconClass: string;
  templateFooter: string;
  placement: PopOverPlacement; // 'bottom' | 'top' | 'left' | 'right'
  popoverTheme: string;
}
```

## Methods

### constructor(id: string, iconset: string[], pageSize: number, options: Options)

```javascript
//const iconset = ['fa-solid fa-home', 'fa-solid fa-star',...];
var iconPicker = new IconPicker('element-id', iconset, 30, {});
```

### setSelected(icon: string): void

```javascript
iconPicker.setSelected('fa-solid fa-home');
```

### setPopoverTheme(theme: string): void

Only when the icon picker is a button

```javascript
iconPicker.setPopoverTheme('dark'); // 'dark' | 'light'
```

### mount(): void
Build and renderize the icon picker

```javascript
iconPicker.mount();
```

## Events

### onChange(listener: (param: { icon: string, button: HTMLButtonElement} => void): void

```javascript
iconPicker.onChange((params) => {
  console.log('Icon: ' + params.icon);
});
```
## License

MIT

## Changelog

#### v1.0.1
* fix: iconsets path, styles path

#### v1.0.0
* First release

## Contact

[![Linkedin Badge](https://img.shields.io/badge/Linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/david-ticona-saravia/)

[![Twitter](https://img.shields.io/twitter/url?url=https://x.com/davicotico?style=social&label=Follow%20%40davicotico)](https://x.com/davicotico)
