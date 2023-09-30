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
//   @Input() currentStory: IStory;
    currentStory$= this.storyService.currentStoryObserver$;



  storysub: IPlotView[] | undefined;


  ngOnInit(): void {
    this.currentStory$.subscribe(
      story => {
        this.storysub = story.plots
      }
    )


  }


  constructor(private storyService: StoryService) {
  }

  updateStory(story: IStory): void {
    this.storyService.updateStory(story);
  }

}
