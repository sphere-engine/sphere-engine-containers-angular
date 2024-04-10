import { Component } from '@angular/core';
// import { workspace } from 'workspace-se';

@Component({
  selector: 'app-library-test',
  templateUrl: './library-test.component.html',
  styleUrls: ['./library-test.component.scss'],
})
export class LibraryTestComponent {
  protected id: string = 'bf4e5afb8fd4420fb052e6e7fc4a8d0b';
  protected workspaces: any[] = [];
  public setWorkspace(ws: any): void {
    this.workspaces.push(ws);
  }

  public handleChange = (e: any): void => {
    console.log(JSON.stringify(e.data));
  };

  public subscribe(): void {
    this.workspaces[0].events.subscribe(
      'afterScenarioExecutionExt',
      this.handleChange
    );
  }
}
