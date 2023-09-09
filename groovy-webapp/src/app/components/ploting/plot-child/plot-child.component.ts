import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../../models/story.model";

@Component({
  selector: 'app-plot-child',
  templateUrl: './plot-child.component.html',
  styleUrls: ['./plot-child.component.css']
})
export class PlotChildComponent {

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
