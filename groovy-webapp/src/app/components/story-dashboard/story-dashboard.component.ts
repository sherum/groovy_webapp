import {Component, OnInit} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css']
})
export class StoryDashboardComponent implements OnInit{

 workingStory$ = this.storyService.currentStoryObserver$;
 // plots:IPlot[]|undefined;

     constructor(private storyService:StoryService){}

    ngOnInit(): void {

    }


}
