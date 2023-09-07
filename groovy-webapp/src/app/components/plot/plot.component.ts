import { Component } from '@angular/core';
import {IPlot} from "../../models/story.model";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {
  plot:IPlot|undefined;

}
