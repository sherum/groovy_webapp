import { Component } from '@angular/core';
import {IPlot} from "../../models/story.model";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {

  plot:IPlot|undefined;
  plots:IPlot[]|undefined;

  create():void{}
  save():void{}
  delete():void{}
  setParent():void{}
  select(id:string):void{}

}
