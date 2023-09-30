import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlotView, PlotView} from "../../models/transform.model";
import {PlotService} from "../../services/plot.service";

@Component({
    selector: 'app-dao-plot',
    templateUrl: './dao-plot.component.html',
    styleUrls: ['./dao-plot.component.css']
})
export class DaoPlotComponent implements OnInit {

    // @ts-ignore
    @Input() dao: IPlotView;
    @Output() display = new EventEmitter<IPlotView>();


    constructor(private plotService: PlotService) {
    }




    showDetail(plot:IPlotView) {

      console.log("current plot is: ",plot);
        // console.log("Show detail calls plot service with:", this.dao);
        // this.plotService.setCurrentPlot(this.dao);
      this.display.emit(plot);
    }

    ngOnInit(): void {
        console.log("This input is ", this.dao);

    }


}
