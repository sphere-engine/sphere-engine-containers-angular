import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { LibraryTestComponent } from './components/library-test/library-test.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AsideComponent,
  },
  {
    path: 'library-test',
    component: LibraryTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
