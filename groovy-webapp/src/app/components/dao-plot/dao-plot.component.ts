import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlotDao} from "../../models/transform.model";

@Component({
  selector: 'app-dao-plot',
  templateUrl: './dao-plot.component.html',
  styleUrls: ['./dao-plot.component.css']
})
export class DaoPlotComponent {

  // @ts-ignore
  @Input() dao:IPlotDao;


  constructor(private plotService:PlotService) {
  }

  showDetail(){
    console.log("Show detail calls plot service with:",this.dao);
    this.plotService.nextDisplayedPlot(this.dao);
  }




}
