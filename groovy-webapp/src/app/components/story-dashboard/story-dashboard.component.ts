import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {IPlotView} from "../../models/transform.model";

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css']
})
export class StoryDashboardComponent implements OnInit {


  // @ts-ignore
  @Input() currentStory: IStory;
  plots:IPlotView[] | undefined;

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.plots = this.currentStory?.plots;
    console.log(this.currentStory?.plots);
    console.log(this.currentStory?.scenes);
    console.log(this.currentStory?.people);
    console.log(this.currentStory?.events);
    console.log(this.currentStory?.locations);
    console.log(this.currentStory?.things);
  }

  updateStory(story: IStory): void {
    this.storyService.updateStory(story);
  }

}
