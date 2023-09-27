import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlotView, PlotView} from "../../models/transform.model";
import {NgForm} from "@angular/forms";
import {PlotService} from "../../services/plot.service";

@Component({
  selector: 'app-dao-form',
  templateUrl: './dao-form.component.html',
  styleUrls: ['./dao-form.component.css']
})
export class DaoFormComponent {

  // @ts-ignore
  @Input() dao: IPlotView;
  @Output() savePlot = new EventEmitter<IPlotView>();
  @Output() deletePlot = new EventEmitter<IPlotView>();
  @Output() createSubplot = new EventEmitter<IPlotView>();

constructor(private plotService:PlotService) {}


  addSubplot(): void {
  this.createSubplot.emit(this.dao);
  }

  promote(): void {
    let pv = new PlotView(this.dao);
    pv.promoteTopPlot();
    this.dao = pv;
  }
  onSubmit(form: NgForm) {
    this.savePlot.emit(this.dao);

  }
  save():void{
    this.savePlot.emit(this.dao);
  }

  delete():void{
    this.deletePlot.emit(this.dao);
  }

}
