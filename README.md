# Reveal.js - Demonstration

This project showcases a full presentation on Agro-Geoecology, with an introductory slide from a separate presentation about the Newton-Raphson Method. Both presentations utilize q5.js, a lightweight alternative to p5.js, for canvas animations.

I really can recommend reveal.js as a fun, interactive, full-control, effective, ... presentation-framework!

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

-   `--dl`: Downloads hotlinked images before the build process.
-   `--prod`: Uses webpack in production mode.

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

## Docker

Once the container runs, it listens on http://localhost:7823/

#### For Development Purposes (live updating)

```bash
docker compose -f docker-compose.dev.yaml up
```

When using docker in dev-mode, be sure to mount volumes to the container from a linux environment!, ... else feel free to add polling to webpack.

#### Else - Onetime-Build

```bash
docker compose -f docker-compose.prod.yaml up
```
---

#### Bun

When using bun via `bun run` it actually uses node.js nevertheless in this case.\
See `bun --bun run` - errors
