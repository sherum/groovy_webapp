import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {StoryListComponent} from "./components/story-list/story-list.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {PlotListComponent} from "./components/plot-list/plot-list.component";
import {DaoPlotListComponent} from "./components/dao-plot-list/dao-plot-list.component";
import {StoryComponent} from "./components/story/story.component";

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
    ,children:[
      {path:':id',component:StoryComponent,children:[
        { path:':id/plots',component:DaoPlotListComponent}
          // ,
          // { path:'scenes',component:SceneListComponent},
          // { path:'people',component:PeopleListComponent},
          // { path:'events',component:EventListComponent},
          // { path:'locations',component:LocationListComponent},
          // { path:'things',component:ThingsListComponent}]}
    ]}
      ]

  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'plots',
    component: PlotListComponent,
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
