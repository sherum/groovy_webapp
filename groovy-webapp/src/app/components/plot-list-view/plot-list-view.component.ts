import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../models/story.model";

@Component({
  selector: 'plot-list-view',
  templateUrl: './plot-list-view.component.html',
  styleUrls: ['./plot-list-view.component.css']
})
export class PlotListViewComponent {

  @Input() plot:IPlot |undefined;
  @Input() plots:IPlot[]|undefined;
  @Output() deleteMe:EventEmitter<string> = new EventEmitter<string>();

  delete(){
    this.deleteMe.emit(this.plot?.id);
  }



}
