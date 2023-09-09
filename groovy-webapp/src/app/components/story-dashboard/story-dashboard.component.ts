import { Component } from '@angular/core';
import {IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css']
})
export class StoryDashboardComponent {

 workingStory$ = this.storyService.currentStoryObserver$;

     constructor(private storyService:StoryService){}



}
