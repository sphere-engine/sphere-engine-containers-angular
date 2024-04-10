import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { WorkspaceFormComponent } from './components/workspace-form/workspace-form.component';
import { LibraryTestComponent } from './components/library-test/library-test.component';
// import { WorkspaceSeModule } from 'projects/workspace-se/src/public-api';
import { WorkspaceSeModule } from 'workspace-se';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    WorkspaceComponent,
    ModalComponent,
    WorkspaceFormComponent,
    LibraryTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    WorkspaceSeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
