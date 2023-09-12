import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {data, IPlot, IStory} from "../models/story.model";
import {StoryService} from "./story.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlotService {


  url = "http://localhost:8080";
  getPlotsUri = `${this.url}/plot`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  constructor(private http: HttpClient, private storyService: StoryService) {
  }

  selctedStory$ = this.storyService.currentStoryObserver$;


  private selectedStoryPlot = new Subject<IPlot>();
  selectedPlots$ = this.selectedStoryPlot.asObservable();

  selectPlot(plot: IPlot): void {
    this.selectedStoryPlot.next(plot);
    console.log("A new plot was chosen", plot);
  }

  /**
   * Not sure why I think I need this.
   * @private
   */
  private selectedPlotList = new Subject<IPlot[]>();
  currentPlotList$ = this.selectedPlotList.asObservable()

  updatePlotList(plot: IPlot[]): void {
    this.selectedPlotList.next(plot);
  }

  private storySavePlot = new Subject<IPlot>();
  insertedSavePlot$ = this.storySavePlot.asObservable();

  updateSavePlot(plot: IPlot): void {
    this.storySavePlot.next(plot);
  }

  newPlot(story: IStory): Observable<IPlot> {
    let storyId = story.id;
    console.log("New PLot CHeking storyId ", storyId);
    let payload = "AAA" + storyId;
    let uri = `${this.getPlotsUri}/new`;
    return this.http.post<IPlot>(uri, payload,
      {headers: this.headers});
  }

  deletePlot(storyId: string, plotId: string): void {

    let uri = `${this.getPlotsUri}/${storyId}/${plotId}`;
    console.log("The URI: ", uri)
    this.http.delete(uri, {headers: this.headers}).subscribe(
      data => {
        console.log("Inside the http delete")
      },
      error => console.log("Delete error", error),
      () => console.log("Completed Delete")
    );

  }
}
