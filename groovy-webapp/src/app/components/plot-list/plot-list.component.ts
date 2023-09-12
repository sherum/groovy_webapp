import {Component, Input} from '@angular/core';
import {IPlot} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {combineLatest, Subject} from "rxjs";
import {PlotService} from "../../services/plot.service";

@Component({
    selector: 'app-plot-list',
    templateUrl: './plot-list.component.html',
    styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {


    plots:IPlot[]|undefined;
    //plot$ = this.plotService.selectedPlots$;



    constructor(private plotService:PlotService) {
        this.plotService.selctedStory$.subscribe(
            story => {
                this.plots = story.plots;
                console.log("the story", story);
                console.log("the plots", this.plots);
                }
        );
    }


    create(): void {

    }

    save() {

    }


    delete(): void {

    }

    selectPlot(plot:IPlot){
      this.plotService.selectPlot(plot);
    }

}
