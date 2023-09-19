import {Component, Input, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotView, PlotView} from "../../models/transform.model";
import {from, Observable, of, scan, merge} from "rxjs";
import {IStory, Story} from "../../models/story.model";

@Component({
    selector: 'app-dao-plot-list',
    templateUrl: './dao-plot-list.component.html',
    styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent implements OnInit {

    // @ts-ignore
    @Input() story: IStory


  daoList$ = merge(
        this.plotService.selectedPlotList$,
        this.plotService.insertedSavePlot$
    ).pipe(
     scan((acc, value) =>
      (value instanceof Array) ?
        [...value] : [...acc, value],
     [] as IPlotView[])
    );


    // @ts-ignore
    selectedDao: IPlotView;


    constructor(private plotService: PlotService) {
    }

    ngOnInit(): void {
        this.plotService.currentSelectedPlot$.subscribe(
            data => this.selectedDao = data
        );
    }

    create(): void {
        let parentId = this.selectedDao?.parentId;
        let plotview: IPlotView = new PlotView(parentId);
        this.plotService.updateSavePlot(plotview);
        this.plotService.selectPlot(plotview);
    }

    save(dao:IPlotView):void{
      this.plotService.updateSavePlot(<IPlotView>this.selectedDao);


    }


}
