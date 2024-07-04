# Reveal.js - Demonstration
Showcases one whole presentation (about agro-geoecology), while the first slide belongs to another presentations' intro-page (about Newton-Raphson-Method)

### after clone
```bash
npm install
```

## Build

To build the project, use the following command:

```bash
npm run build
```

### Optional Parameters for Build

- `--dl`: Downloads hotlinked images before the build process.
- `--prod`: Uses webpack in production mode.

You can use these optional parameters like this:

```bash
npm run build -- --dl --prod
```

## Development

To start the development server, use the following command:

```bash
npm run dev
```

This will start the webpack-development server with hot-reloading enabled.
