import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {PlotService} from "../../services/plot.service";
import {map, merge, scan} from "rxjs";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  plot$ = this.plotService.selectedPlots$
  plots: IPlot[] | undefined;
  story$ = this.plotService.selctedStory$;
  // @ts-ignore
  @Input() currentStory:IStory;


  constructor(private plotService: PlotService) {
  }

  ngOnInit(): void {
    // this.story$.pipe(
    //   map((story) => this.plots = story.plots)
    // );
    this.plots = this.currentStory.plots;

  }


  savePlot(plot:IPlot): void {
    this.plotService.updateSavePlot(<IPlot>plot);
    // merge(
    //   this.story$,
    //   this.plot$
    // ).pipe(
    //   scan((story, plot) =>
    //       (plot instanceof Array) ? [...plot] : [...story],
    //     [] as IPlot[])
    // );
  }

  deletePlot(plot:IPlot): void {
    console.log("Plot delete pressed");
    let storyId =<string> this.currentStory.id
    let plotId = <string>plot.id;
    // this.plot$.subscribe(data => {
    //     plotId = <string>data.id;
    //     console.log("Delting plot ID: ",plotId);
    // });
    this.plotService.deletePlot(storyId, plotId);
    console.log("Deleteplot after")
  }


}
