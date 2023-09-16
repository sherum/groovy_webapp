import {Component} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotDao} from "../../models/transform.model";

@Component({
  selector: 'app-dao-plot-list',
  templateUrl: './dao-plot-list.component.html',
  styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent {
  // daoList$ = this.plotService.daoList$;
  daoList$ = this.plotService.selectedPlots$;
  selectedDao:IPlotDao|undefined;
  showForm = false;

  displayEntryForm(dao: any): void {
    console.log("Display entry form", dao)

   this.selectedDao = dao;
   this.showForm = true;
  }

  constructor(private plotService: PlotService) {
  }


}
