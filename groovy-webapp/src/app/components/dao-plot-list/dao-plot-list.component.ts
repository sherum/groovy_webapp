import {Component, Input, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {IPlotView, PlotView} from "../../models/transform.model";
import {combineLatest, distinct, map, merge, Observable, scan} from "rxjs";
import {IStory} from "../../models/story.model";

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
  currentPlot: IPlotView | undefined;
  selectedDao$: Observable<IPlotView> = this.plotService.currentPlotObserver$;
  processPlot:IPlotView[]|undefined;

  plots$ = combineLatest([
   this.plotService.getPlots(),
    this.plotService.selectedStory$
  ])
    .pipe(
      map(([plots, story]) =>
        plots.filter((plot: IPlotView) =>
          // @ts-ignore
          plot.storyId == story.id)
      ),
    );

  // daoList$ = merge(
  //   this.plots$,
  //   this.plotService.insertedPlot$
  // ).pipe(
  //   scan((acc, value) =>
  //       (value instanceof Array) ?
  //         [...value] : [...acc, value],
  //     [] as IPlotView[]),
  // );


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
    let childPLot: IPlotView;
    if (this.childPlot()) {
      console.log("child plot flow");
      this.plotService.newPlot().subscribe(p => childPLot = p);
      this.selectedDao$.subscribe(currentPlot => {
        currentPlot.subplots?.push(childPLot);
        if (this.currentStory) {
          this.plotService.updatePlot(this.currentStory);
        }
        this.plotService.setCurrentPlot(childPLot);
      });
    } else {
      this.plotService.newPlot().subscribe(p => {
        childPLot = p
        childPLot.topPlot = true;
        this.plotService.setCurrentPlot(childPLot);
        this.currentStory?.plots?.push(childPLot)
        if (this.currentStory) {
          this.plotService.updatePlot(this.currentStory);
        }
      });
    }

  }



  save(event: IPlotView): void {
    this.plotService.setCurrentPlot(<IPlotView>event)
    if (this.currentStory) {
      this.plotService.updatePlot(this.currentStory);
    }
  }


  delete(event: IPlotView): void {
    this.plotService.setNextDeletedPlot(<IPlotView>event)
    this.plotService.deletePlot();
  }

  setCurrent(event: IPlotView): void {
    this.currentPlot = event;
    this.plotService.setCurrentPlot(event);
  }

  addSubplot():void{
    this.selectedDao$.subscribe(
      parent => {
        this.plotService.addSubplot(parent).subscribe(data => {
          this.plotService.setCurrentPlot(data)
        });

      }
    )

    // this.plotService.updatePlot(this.story);
  }

}
