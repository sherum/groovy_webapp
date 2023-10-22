import {Component, effect} from '@angular/core';
import {IPlot, IStory} from "../../../models/story.model";
import {Observable, of} from "rxjs";
import {PlotService} from "../../../services/plot.service";
import {StoryService} from "../../../services/story.service";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-plot-list',
  templateUrl: './alt-plot-list.component.html',
  styleUrls: ['./alt-plot-list.component.css']
})
export class AltPlotListComponent {


  story: IStory = this.storyService.currentDnStory();
  plot$: Observable<IPlot> | undefined;
  plots = this.story.plots ? this.story.plots : [];
  activePlot = this.storyService.currentDnPlot()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.plots = this.story.plots ? this.story.plots : [];
      this.plot$ = undefined;
    });
  }

  create(): void {
    this.storyService.addPLot();
  }

  createSubplot(plot: IPlot) {

  }


  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().plots?.findIndex(plot => plot.id == this.storyService.currentDnPlot().id);
    this.storyService.currentDnStory().plots?.splice(idx, 1);
    this.storyService.currentDnStory().plots?.push(this.storyService.currentDnPlot());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(plot: IPlot): void {

  }



  select(plot: IPlot) {
    this.storyService.updateCurrentPlot(plot);
    this.plot$ = of(this.storyService.currentDnPlot());
  }





}
