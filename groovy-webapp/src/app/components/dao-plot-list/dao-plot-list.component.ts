import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotDao} from "../../models/transform.model";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-dao-plot-list',
  templateUrl: './dao-plot-list.component.html',
  styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent implements OnInit{
  // daoList$ = this.plotService.daoList$;
  daoList$ = this.plotService.selectedPlots$;
  // @ts-ignore
  selectedDao:IPlotDao;


  constructor(private plotService: PlotService) {
  }

  ngOnInit(): void {

    this.plotService.currentSelectedPlot$.subscribe(
      data => this.selectedDao = data
    );
  }


}
