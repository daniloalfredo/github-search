import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchbarComponent
  },
  {
    path: 'user/:username',
    component: UserDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
