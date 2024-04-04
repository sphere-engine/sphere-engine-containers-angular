import { NgModule } from '@angular/core';
import { WorkspaceSeComponent } from './workspace-se.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkspaceSeComponent],
  imports: [BrowserModule, FormsModule],
  exports: [WorkspaceSeComponent],
})
export class WorkspaceSeModule {}
