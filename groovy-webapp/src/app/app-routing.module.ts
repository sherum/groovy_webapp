import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {StoryListComponent} from "./components/story-list/story-list.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'stories',
    component: StoryListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  // {
  //   path: 'plots',
  //   component: PlotsComponent,
  // },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
