import {Component, Input} from '@angular/core';
import {IPlot} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {combineLatest, Subject} from "rxjs";

@Component({
    selector: 'app-plot-list',
    templateUrl: './plot-list.component.html',
    styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {

    // private selectedStoryPlot = new Subject<IPlot>;
    // selectedPlots$ = this.selectedStoryPlot.asObservable();

    plots:IPlot[]|undefined;



    constructor(private storyService: StoryService) {
        this.storyService.currentStoryObserver$.subscribe(
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

    selectPlot(plot: IPlot): void {
       // this.plot = plot;
    }
}
