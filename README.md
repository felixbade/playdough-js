# PlaydoughJS

![npm](https://img.shields.io/npm/v/playdough)
![npm bundle size](https://img.shields.io/bundlephobia/min/playdough)
![NPM](https://img.shields.io/npm/l/playdough)

Simple SVG library for interactive projects

See [examples folder](/examples).

## Importing

### URL

```html
<script src="https://cdn.jsdelivr.net/npm/playdough@0.3.0/dist/main.js"></script>
```

```javascript
const { Playdough } = PlaydoughJS
```

### NPM
```sh
npm install playdough
```

```javascript
import { Playdough } from 'playdough'
```

## Philosophy
- PlaydoughJS does not aim to provide full control of the SVG’s raw XML. Instead, opinionated abstractions are provided.