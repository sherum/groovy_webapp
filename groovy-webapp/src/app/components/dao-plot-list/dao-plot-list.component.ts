import {Component} from '@angular/core';
import {PlotService} from "../../services/plot.service";

@Component({
  selector: 'app-dao-plot-list',
  templateUrl: './dao-plot-list.component.html',
  styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent {
  // daoList$ = this.plotService.daoList$;
  daoList$ = this.plotService.selectedPlots$;

  displayPlot($event: any): void {
    console.log("DIsplay plot", $event);
  }

  constructor(private plotService: PlotService) {
  }


}
