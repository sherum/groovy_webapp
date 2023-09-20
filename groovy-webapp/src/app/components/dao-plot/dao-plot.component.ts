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



    constructor(private plotService: PlotService) {
    }




    showDetail() {
        console.log("Show detail calls plot service with:", this.dao);
        this.plotService.setCurrentPlot(this.dao);
    }

    ngOnInit(): void {
        console.log("This input is ", this.dao);

    }


}
