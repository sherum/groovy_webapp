import {Component, Input, OnInit} from '@angular/core';
import {IStory} from "../../models/story.model";
import {PlotService} from "../../services/plot.service";
import {IPlotView} from "../../models/transform.model";
import {map, merge, Observable, scan, tap} from "rxjs";
import {Router} from "@angular/router";


@Component({
    selector: 'app-plot-list',
    templateUrl: './plot-list.component.html',
    styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent implements OnInit {


    // @ts-ignore
    @Input() story: IStory;
    // plot$: Observable<IPlotView[]> = this.plotService.getPlots();
    selectedDao: IPlotView | undefined;
    selectedDao$ = this.plotService.currentPlotObserver$;
    removeChildren = false;

  //plot$ = this.plotService.selectedPlots$;

    plot$: Observable<IPlotView[]> = merge(
        this.plotService.getPlots(),
        this.plotService.insertedPlot$
    ).pipe(
        scan((acc, value) =>
                (value instanceof Array) ? [...value] : [...acc, value],
            [] as IPlotView[]),

    );
    constructor(private plotService: PlotService,private router:Router) { }

    ngOnInit(): void {
        // this.plotService.currentPlotObserver$.subscribe(
        //     plot => this.selectedDao = plot
        // );
    }

    create(): void {
        this.plotService.newTopPlot().subscribe(
            {next:  data =>
                {
                   this.select(data);
                   this.plotService.addPlotToInserted(data);
                },
            error: err => console.log("new plot error", err)
            }
        )
    }

    save() {
        console.log("Save plot was pressed");
        this.plotService.setCurrentPlot(<IPlotView>this.selectedDao)
        this.plotService.updatePlot(this.story);
    }


    delete(plot: IPlotView): void {
        this.plotService.removePlot(<string>plot.id, false);
    }

    select(plot: IPlotView) {
        this.plotService.setCurrentPlot(plot);
    }

    sync(): void {
        this.router.navigate(['home'])
            .then(r => this.router.navigate(['plots']));
    }

}

