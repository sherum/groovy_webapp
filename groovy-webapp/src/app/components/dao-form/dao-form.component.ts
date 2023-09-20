import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlotView, PlotView} from "../../models/transform.model";
import {NgForm} from "@angular/forms";

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




  addSubplot(): void {
   let subplot = new PlotView(this.dao);
   this.dao.subplots?.push(subplot);
   this.save();

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
