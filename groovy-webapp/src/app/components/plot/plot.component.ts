import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../models/story.model";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {

  @Input() plot:IPlot|undefined;
  @Input() plots:IPlot[]|undefined;
  @Output() save:EventEmitter<IPlot> =  new EventEmitter<IPlot>();
  @Output() delete:EventEmitter<IPlot> = new EventEmitter<IPlot>();

  savePlot():void{
    this.save.emit(this.plot)
  }

  deletePlot():void{
    this.delete.emit(this.plot);
  }


}
