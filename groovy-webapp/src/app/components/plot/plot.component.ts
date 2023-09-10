import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../models/story.model";
import {PlotService} from "../../services/plot.service";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {

  plot$ = this.plotService.selectedPlots$;
  story$ = this.plotService.selctedStory$;
  // @Output() save:EventEmitter<IPlot> =  new EventEmitter<IPlot>();
  // @Output() delete:EventEmitter<IPlot> = new EventEmitter<IPlot>();


  constructor(private plotService:PlotService) {
  }



  savePlot():void{
   // this.save.emit(this.plot)
  }

  deletePlot():void{
   // this.delete.emit(this.plot);
  }


}
