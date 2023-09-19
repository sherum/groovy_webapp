import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlotView} from "../../models/transform.model";
import {PlotService} from "../../services/plot.service";

@Component({
  selector: 'app-dao-plot',
  templateUrl: './dao-plot.component.html',
  styleUrls: ['./dao-plot.component.css']
})
export class DaoPlotComponent implements OnInit{

  // @ts-ignore
  @Input() dao:IPlotView;



  constructor(private plotService:PlotService) {
  }

  create():void{

  }
  showDetail(){
    console.log("Show detail calls plot service with:",this.dao);
    this.plotService.nextDisplayedPlot(this.dao);
  }

  ngOnInit(): void {
    console.log("This input is ",this.dao);

  }





}
