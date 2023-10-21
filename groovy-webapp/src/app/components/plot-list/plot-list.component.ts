import {Component, effect, Input} from '@angular/core';

import {PlotService} from "../../services/plot.service";
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {

  //  @Input() storyId:string= "";
  //  plot:IPlot |undefined;
  // @Input() plots:IPlot[]|undefined;
  story: IStory = this.storyService.currentStory();
  plot: Observable<IPlot> | undefined;
  plots = this.story.plots ? this.story.plots : [];

  constructor(private plotService: PlotService, private storyService: StoryService) {
    effect(() => {
      this.story = this.storyService.currentStory();
      this.plots = this.story.plots ? this.story.plots : [];
      this.plot = undefined;
    });
  }

  create(): void {
    this.plot = this.plotService.newPlot();

    // @ts-ignore
    // this.plotService.newPlot().subscribe(
    //   data => {
    //     this.plot = data;
    //     console.log("the new Plot ", data);
    //     // @ts-ignore
    //     this.select(data?.id);
    //   },
    //   (err: any) => console.log("new Plot error", err)
    // );
  }

  createSubplot(plot: IPlot) {
    let parentId = <string>plot.id;
    this.plot = this.plotService.addSubplot(parentId);
  }


  save(): void {
    let idx: number = this.plots?.findIndex(plot => plot.id == this.plotService.currentPlot().id);
    if (idx == -1) {
      this.plots.push(this.plotService.currentPlot());
    }
  }

    update() {
    this.plotService.updatePlot(this.plotService.currentPlot());
    this.storyService.updateStoryPlot(this.plotService.currentPlot());
    }



//   if(currentPlot.id){
//   console.log("Update happened")
//   this.plotService.updatePlot(currentPlot);
// }else{
//   console.log("Not update happened")
//   // @ts-ignore
//   let plot$ = this.plotService.newPlot(this.storyId);
//   (plot$).subscribe(data => this.plot = data);
// }


  delete(plot: IPlot): void {
    let id = <string>plot.id;
    this.plotService.delete(id).subscribe(
      (data: void) => {
        // @ts-ignore
        let idx: number = this.plots?.findIndex(plot => plot.id == id);
        this.plots?.splice(idx, 1);
        this.plot = undefined;
      },
      (err: any) => console.log(err)
    );
  }

  setParent(event: any): void {
    console.log("Set Parent  ", event);
  }

  select(plot: IPlot) {
    this.plot = of(plot);
  }


}
