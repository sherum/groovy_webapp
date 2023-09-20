import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent  {

  @Input() plot:IPlot|undefined;

}
