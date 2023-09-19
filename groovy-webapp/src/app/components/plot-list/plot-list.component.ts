import {Component, Input, OnInit} from '@angular/core';
import {IPlot, IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {combineLatest, Subject} from "rxjs";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent implements OnInit {


  // @ts-ignore
  @Input() story: IStory;
  plots: IPlot[] | undefined;
  matchingPlot = false;


  //plot$ = this.plotService.selectedPlots$;


  constructor(private plotService: PlotService) {

  }

  ngOnInit(): void {
    this.plotService.selctedStory$.subscribe(
      story => {
        // @ts-ignore
        this.plots = story.plots;
        this.matchingPlot = false;
        console.log("the story", story);
        console.log("the plots", this.plots);
      }
    );

    this.plotService.selectedPlots$.subscribe(
      data => {
       // this.matchingPlot =  !!this.plots?.find(plot => plot.id == data.id)
      }
    );
  }

  create(): void {

    this.plotService.newPlot(this.story).subscribe(
      data => this.selectPlot(data)
    )
  }

  save() {

  }


  delete(): void {

  }

  selectPlot(plot: IPlot) {
    this.plotService.selectPlot(plot);
  }

}

import {PlotService} from "../../services/plot.service";
