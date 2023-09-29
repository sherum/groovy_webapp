import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {IPlotView} from "../../models/transform.model";
import {ActivatedRoute, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css']
})
export class StoryDashboardComponent implements OnInit {


 // do not keep a reference to the story
  @Input() currentStory: IStory|undefined;
  //currentStory: IStory;
  plots: IPlotView[] | undefined;

  constructor(private route: ActivatedRoute, private storyService: StoryService) {
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   const sid = params.get('id');
    //   this.getStory(<string>sid);

      this.plots = this.currentStory?.plots;
      // console.log(this.currentStory?.scenes);
      // console.log(this.currentStory?.people);
      // console.log(this.currentStory?.events);
      // console.log(this.currentStory?.locations);
      // console.log(this.currentStory?.things);
    // });
  }


// getStory(sid:string):void{
//   this.storyService.getStory(sid).subscribe(
//     data => {
//        const story = data;
//        this.plots = story.plots;
//
//       // this.scenes
//       // this.people
//       // this.events
//       // this.locations
//       // this.things
//
//     }
//   )
// }
//

  // updateStory(story:IStory):void {
  // this.storyService.updateStory(story);
  // }

}
