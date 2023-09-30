import {Component, Input, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotView, PlotView} from "../../models/transform.model";
import {combineLatest, map, merge, Observable, scan} from "rxjs";
import {IPlot, IStory} from "../../models/story.model";


@Component({
  selector: 'app-dao-plot-list',
  templateUrl: './dao-plot-list.component.html',
  styleUrls: ['./dao-plot-list.component.css']
})
export class DaoPlotListComponent implements OnInit {

  // @ts-ignore
  @Input() story: IStory;

  @Input() plots: IPlotView[] | undefined;
  showPlot: boolean = false;
  isChild = false;

  sid: string | undefined;
  currentStory: IStory | undefined;
  currentPlot:IPlotView|undefined;
  selectedDao$: Observable<IPlotView> = this.plotService.currentPlotObserver$;

  storyPlots$ = this.plotService.getPlots()
    .pipe(
      map(plots =>
        plots.filter(plot => this.story.id == plot.storyId))
    );

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

  daoList$ = merge(
    this.plots$,
    this.plotService.insertedPlot$
  ).pipe(
    scan((acc, value) =>
        (value instanceof Array) ?
          [...value] : [...acc, value],
      [] as IPlotView[]),
  );


  constructor(private plotService: PlotService) {
  }

  ngOnInit(): void {
    this.plotService.selectedStory$.subscribe(
      nextstory => {
        this.currentStory = nextstory;
        if (this.story != this.currentStory) {
          this.story = this.currentStory;
          this.currentPlot = this.story.plots?.at(0);
        }

      }
    )
  }

  private childPlot(): boolean {
    this.selectedDao$.subscribe(
      data => {
        this.currentStory?.plots?.find(plot => plot.id == data.id) ? this.isChild = true : this.isChild = false;
        console.log("Is child: ", this.isChild);
      });
    return this.isChild;
  }

  create(): void {
    let childPLot:IPlotView;
    if(this.childPlot()){
      this.plotService.newPlot().subscribe(p => childPLot = p);
      this.selectedDao$.subscribe(currentPlot => {
        currentPlot.subplots?.push(childPLot);
        this.plotService.updatePlot();
        this.plotService.setCurrentPlot(childPLot);
      });
    } else {
      this.plotService.newPlot().subscribe(p => {
        childPLot = p
         this.plotService.setCurrentPlot(childPLot);
          this.plotService.selectedStory$.subscribe(story=> story.plots?.push(childPLot));
     });
    }
  }

  save(event: IPlotView): void {
    this.plotService.setCurrentPlot(<IPlotView>event)
    this.plotService.updatePlot();
  }


  delete(event: IPlotView): void {
    this.plotService.setNextDeletedPlot(<IPlotView>event)
    this.plotService.deletePlot();
  }

  setCurrent(event:IPlotView):void{
    this.currentPlot = event;
  }

}
