import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IPlot} from "../models/story.model";
import {StoryService} from "./story.service";

@Injectable({
    providedIn: 'root'
})
export class PlotService {

    constructor(private storyService: StoryService) {
    }
    selctedStory$ = this.storyService.currentStoryObserver$;

    private selectedStoryPlot = new Subject<IPlot>;
    selectedPlots$ = this.selectedStoryPlot.asObservable();

    selectPlot(plot: IPlot): void {
        this.selectedStoryPlot.next(plot);
    }

}
