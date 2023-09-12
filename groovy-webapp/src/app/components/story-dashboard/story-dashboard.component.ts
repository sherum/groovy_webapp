import {Component, Input, OnInit} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css']
})
export class StoryDashboardComponent implements OnInit{

// @ts-ignore
  @Input() currentStory:IStory;


     constructor(private storyService:StoryService){}

    ngOnInit(): void {

    }


}
