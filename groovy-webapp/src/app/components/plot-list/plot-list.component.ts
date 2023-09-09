import {Component, Input} from '@angular/core';
import {IPlot} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {



  @Input() plots:IPlot[]|undefined;
  plot:IPlot|undefined;

  constructor(private storyService:StoryService) {
    this.storyService.currentStoryObserver$.subscribe(
        storyData=>{
          let plots = storyData.plots
        }
    )
  }


  create():void{

  }
  save(){

  }


  delete():void{

  }

  selectPlot(plot:IPlot):void{
    this.plot = plot;
  }
}
