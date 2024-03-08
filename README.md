# Workspace Integration

This project is an example of using [Sphere Engine Containers](https://sphere-engine.com/containers)
with Angular 16.

## Download necessary libraries

Run `npm install` to download all packages used in project.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Website usage

Start with writing in first input access token given by the company. Next write the id of a project you want to create a workspace. After that you can render it on the left or open in a fullscreen modal. You can hide it by clicking on "destroy" button and remove this workspace with "remove" button. You can also subscribe event after rendering the workspace and check the event response in the box in bottom right corner.

# Workspace Library

## Getting started

Create in `src/assets` file with code snipet. Then in `angular.json` add in `script`:

```ts
...
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/workspace_integration",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/assets/styles.scss"
            ],
            "scripts": [
              "src/assets/index.js" // <-- HERE
            ]
          },
        }
    }
...
```

Include package in project in main component:

```ts
declare global {
  interface Window {
    SE?: any;
  }
}
```

## Usage example

### Creating workspace

You need to add this in html template

```html
<div class="workspace">
  <div data-id="<example-id>" data-workspace="<workspaceId>"></div>
</div>
```

in `data-workspace` you need to write id of your workspace. Then you need to initialize this workspace with `window.SE.workspace(<example-id>)` function.

### Destroying workspace

If you want to destroy workspace you can use a `destroy()` function. Firstly, you need to get your workspace:

```ts
const workspace = window.SE.workspace("<example-id>");
```

and then call function

```ts
workspace.destroy();
```

This function deletes HTML template where workspace was.
