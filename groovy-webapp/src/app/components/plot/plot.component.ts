import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {PlotService} from "../../services/plot.service";
import {map, merge, scan} from "rxjs";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit{

  plot$ = this.plotService.selectedPlots$
  plots:IPlot[]|undefined;
  story$ = this.plotService.selctedStory$;




  constructor(private plotService:PlotService) {
  }
  ngOnInit(): void {
    this.story$.pipe(
      map((story) => this.plots = story.plots)
    );
  }



  savePlot():void{
  merge(
    this.story$,
    this.plot$
  ).pipe(
    scan((story,plot) =>
      (plot instanceof Array) ? [...plot] : [...story],
      [] as IPlot[])
  );
  }

  deletePlot():void{
   // this.delete.emit(this.plot);
  }


}
