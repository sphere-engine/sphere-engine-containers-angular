# WorkspaceSe in Angular 16

## Installing

Using npm:

```bash
$ npm install workspace-se
```

Once the package is installed, you can import the library like this:

```ts
import { WorkspaceSeModule } from "workspace-se";
```

make sure you insert it in app.module.ts:

```ts
...
imports: [
    WorkspaceSeModule
],
...
```

## Example

After all you can use that in html:

```html
<lib-workspace-se></lib-workspace-se>
```

it will create a widget with input for workspace id. After the id is set you can load the workspace.

### Usage

You can insert id with input value:

```html
<lib-workspace-se [workspaceId]="parentVariable"></lib-workspace-se>
```

moreover you can send from child to parent workspace object:

```html
<lib-workspace-se [workspaceId]="parentVariable" (setWorkspace)="parentFunction($event)"></lib-workspace-se>
```

After saving workspace object in parent component you can either subscribe, unsubscribe events or destroy them:

```ts
// destroying workspace
workspace.destroy();

// subscribing event in workspace
workspace.events.subscribe(event, handler);

// unsubscribing event in workspace
workspace.events.unsubscribe(event, handler);
```

## Styling

You can change height of workspace with Input() in your component:

```html
<lib-workspace-se [workspaceSize]="height"></lib-workspace-se>
```

Note: It must be string that can be set as height e.g.: `"100px"`, `"80%"` or `"95vh"`;

## Modal

If you have modal and want to let main workspace still work in the background and create another workspace in modal you can use Input() with name `modal` and change boolean value (deafult is false):

```html
<lib-workspace-se [modal]="true"></lib-workspace-se>
```
