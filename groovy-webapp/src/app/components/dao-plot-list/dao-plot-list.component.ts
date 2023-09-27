import {Component, Input, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotView} from "../../models/transform.model";
import {combineLatest, map, merge, Observable, scan} from "rxjs";
import {IStory} from "../../models/story.model";



@Component({
    selector: 'app-dao-plot-list',
    templateUrl: './dao-plot-list.component.html',
    styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent implements OnInit {

    // @ts-ignore
    @Input() story: IStory
    sid: string | undefined;
    currentStory$ = this.plotService.selectedStory$;

    storyPlots$ = this.plotService.getPlots()
        .pipe(
            map(plots =>
                plots.filter(plot => this.story.id == plot.storyId))
        );

    daoList$ = merge(
        this.plots$,
        this.plotService.insertedPlot$
    ).pipe(
        scan((acc, value) =>
                (value instanceof Array) ?
                    [...value] : [...acc, value],
            [] as IPlotView[]),
    );



    selectedDao$: Observable<IPlotView> = this.plotService.currentPlotObserver$;
    plots$ = combineLatest([
        this.plotService.getPlots(),
        this.plotService.selectedStory$
    ])
        .pipe(
            map(([plots, story]) =>
                plots.filter((plot: IPlotView) =>
                    // @ts-ignore
                    plot.storyId == story.id)
                )
        );


    selectedDao$: Observable<IPlotView> = this.plotService.currentPlotObserver$;


    constructor(private plotService: PlotService) {
    }

    ngOnInit(): void {
    }

    create(): void {
        let sid = this.story.id;
        let pid: string | undefined;
        let plot: IPlotView;
        this.selectedDao$.subscribe(data => pid = data.id);
        this.plotService.newPlot().subscribe(
            {
                next: newplot => {
                    plot = newplot
                    plot.storyId = sid;
                    plot.parentId = pid;
                },
                error: err => console.log("Plot creation error", [sid, pid, err]),
                complete: () => {
                    // @ts-ignore
                    plot.parentId.length < 1 ? plot.topPlot = true : plot.topPlot = false;
                    this.plotService.setCurrentPlot(plot)
                }
            }
        );
    }

    save(event: IPlotView): void {
        this.plotService.setCurrentPlot(<IPlotView>event)
        this.plotService.updatePlot();
    }


    delete(event: IPlotView): void {
        this.plotService.setCurrentPlot(<IPlotView>event)
        this.plotService.deletePlot();
    }


}
