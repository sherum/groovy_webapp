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
  @Output() showSelf = new EventEmitter<IPlotDao>();

  showDetail(){
     this.showSelf.emit(this.dao);
     console.log("Show Self emitted ",   this.dao);
  }




}
