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



  addSubplot(): void {
   let subplot = new PlotView(this.dao.id);
   this.dao.subplots?.push(subplot);
   this.save();

  }

  onSubmit(form: NgForm) {


  }
  save():void{
    this.savePlot.emit(this.dao);
  }


}
