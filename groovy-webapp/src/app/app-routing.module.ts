import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
// import {StoryListComponent} from "./components/not-alt/story-list/story-list.component";
import {ProfileComponent} from "./components/profile/profile.component";
// import {PlotComponent} from "./components/not-alt/plot/plot.component";
import {AltStoryListComponent} from "./components/alt-stories/alt-story-list/alt-story-list.component";
import {AltPlotComponent} from "./components/alt-plots/alt-plot/alt-plot.component";

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
    path: 'altstories',
    component: AltStoryListComponent,
    children:[
      {
        path: 'plots/:id',
        component: AltPlotComponent,
      },
    ],
  },
  // {
  //   path: 'stories',
  //   component: StoryListComponent,
  //     children:[
  //         {
  //             path: 'plots/:id',
  //             component: PlotComponent,
  //         },
  //     ],
  // },
  // {
  //   path: 'stories',
  //   component: AStoryListComponent
  // },
  {
      component: ProfileComponent,
      path: 'profile'
  },
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
