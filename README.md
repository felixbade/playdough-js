# PlaydoughJS

![npm](https://img.shields.io/npm/v/playdough)
![npm bundle size](https://img.shields.io/bundlephobia/min/playdough)
![NPM](https://img.shields.io/npm/l/playdough)

Simple SVG library for interactive projects

See [examples folder](/examples).

## Importing

### URL

```html
<script src="https://cdn.jsdelivr.net/npm/playdough@0.8.1/dist/main.js"></script>
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
0. The value of a framework is in the projects that *have been made* with it, not in the library.
1. Maximize visual expression power.
2. Focus on SVG’s unique strengths, not replicating canvas.
3. Focus on the browser as an SVG presentation medium.
4. The raw XML of the SVG is irrelevant. What matters is graphic output and performance.
5. Embrace flatness and depth illusions over precise 3D methods.
6. Animations are important.
7. Interactivity is important. However, state management features are complex, therefore they should have a strict focus on visuality.
8. Opinionated defaults and abstractions help reduce decision-making fatigue from the application developer.
9. Explicit definitions might look slightly ugly sometimes, but ultimately they give flexibility for advanced use, and feeling of authority for light use.
10. There is always a balance between modular and integrated approaches. The right answer is what is fun to use.