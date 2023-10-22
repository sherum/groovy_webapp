import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { StoryComponent } from './components/not-alt/story/story.component';
import { StoryListComponent } from './components/not-alt/story-list/story-list.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import {UserTokenInterceptor} from "./services/user-token.interceptor";
import { PlotListComponent } from './components/not-alt/plot-list/plot-list.component';
import { PlotComponent } from './components/not-alt/plot/plot.component';
import { PlotListViewComponent } from './components/not-alt/plot-list-view/plot-list-view.component';
import { StoryDashboardComponent } from './components/not-alt/story-dashboard/story-dashboard.component';
import { AltStoryListComponent } from './components/alt-stories/alt-story-list/alt-story-list.component';
import { AltStoryComponent } from './components/alt-stories/alt-story/alt-story.component';
import { AltPlotListComponent } from './components/alt-plots/alt-plot-list/alt-plot-list.component';
import { AltPlotComponent } from './components/alt-plots/alt-plot/alt-plot.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    AboutComponent,
    HomeComponent,
    StoryComponent,
    StoryListComponent,
    PlotListComponent,
    PlotComponent,
    PlotListViewComponent,
    StoryDashboardComponent,
    AltStoryListComponent,
    AltStoryComponent,
    AltPlotListComponent,
    AltPlotComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:UserTokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
