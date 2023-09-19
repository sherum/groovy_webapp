import {Injectable} from '@angular/core';
import {map, Observable, of, Subject} from "rxjs";
import {data,IStory} from "../models/story.model";
import {StoryService} from "./story.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPlotView} from "../models/transform.model";

@Injectable({
  providedIn: 'root'
})
export class PlotService {


  daos:IPlotView[] = [
    {
      "name":"Main Plot",
      "id":"A",
      "parentId":"A",
      "type":"Mystery",
      "description":"A journalist suffering from PTSD and professional assassins must survive long enough to investigate an airline disaster and the conspiracy around it.",
      "subplots":[
        {
          "name":"Act I",
          "id":"B",
          "parentId":"A",
          "type":"Setup",
          "description":"Capture the mind of a crazy person unable to see her insanity in real time. " +
            "Cite details that will support evidence of her conditioning later. She's paranoid and they are out to get her.",
          "subplots":[
            {
              "name":"Sabotage/Conspiracy",
              "id":"B1",
              "parentId":"B",
              "type":"subplot",
              "description":"All the evidence at Crash site 2 that doesn't add up.",
              "subplots":[
                {
                  "name":"Erin the Ally",
                  "id":"B1A",
                  "parentId":"B1",
                  "subplots":[],
                  "type":"Character",
                  "description":"Creating a peer resource willing to help and draw out gaps in her investigation. Add sexual tension."
                }
              ],
            },
            {
              "name":"Felicia is crazy",
              "id":"B2",
              "parentId":"B",
              "subplots":[],
              "type":"Arc",
              "description":"Show how deadly Felicia's mental decline is and set up to contrast with her miraculous recovery."
            }
          ],
       },

        {
          "name":"Act II",
          "id":"C",
          "parentId":"A",
          "type":"Confrontation",
          "description":"Felicia is cured of her mental decline, with a new flavor of insanity: Magic",
          "subplots":[
            {
              "name": "Cult Witness",
              "id": "C1",
              "parentId": "C",
              "type": "Arc",
              "description": "Felicia is confronted by a witness claiming divine intervention which doesn't believe ",
              "subplots": [],
            },
            {
              "name": "Pagan Cure",
              "id": "C2",
              "parentId": "C",
              "type": "subplot",
              "description": "Felicia's insanity is transformed overnight by divine intervention albeit pagan flavored.",
              "subplots": [
                {
                  "name": "Real evidence",
                  "id": "C1A",
                  "parentId": "C2",
                  "type": "continuity",
                  "description": "Felicia's cure is steeped in pagan mysticism. All evidence of an impressive, but a terrestrial cure is here.",
                  "subplots": [],
                }
              ],
            }
            ],

        },

        {
          "name":"Act III",
          "id":"D",
          "parentId":"A",
          "type":"Resolution",
          "description":"Felicia comes to terms with the evidence collected, shattering many of her foundational beliefs.",
          "subplots":[ ],
        }
      ],

    }

  ]
  url = "http://localhost:8080";
  getPlotsUri = `${this.url}/plot`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  constructor(private http: HttpClient, private storyService: StoryService) {
  }

  selctedStory$ = this.storyService.getStories();
  selectedPlotList$ = this.storyService.currentStoryObserver$.pipe(
    map(story => story.plots)
  )


  nextSelectedPlotList(plotviews:IPlotView[]):void{
    this.selectedPlotList.next(plotviews);
  }


  private selectedStoryPlot = new Subject<IPlotView>();
  selectedPlots$ = this.selectedStoryPlot.asObservable();

  daoList$ = this.getPlotDaoList();


  selectPlot(plot: IPlotView): void {
    this.selectedStoryPlot.next(plot);
    console.log("A new plot was chosen", plot);
  }

  private currentDiplayedPlotSubject = new Subject<IPlotView>();
  currentSelectedPlot$ = this.currentDiplayedPlotSubject.asObservable();

  nextDisplayedPlot(plot:IPlotView):void{
    console.log("Next displayed subject ",plot)
    this.currentDiplayedPlotSubject.next(plot);
  }



  /**
   * Not sure why I think I need this.
   * @private
   */
  private selectedPlotList = new Subject<IPlotView[]>();
  currentPlotList$ = this.selectedPlotList.asObservable()

  updatePlotList(plot: IPlotView[]): void {
    this.selectedPlotList.next(plot);
  }

  private storySavePlot = new Subject<IPlotView>();
  insertedSavePlot$ = this.storySavePlot.asObservable();

  updateSavePlot(plot: IPlotView): void {
    this.storySavePlot.next(plot);
  }

  newPlot(story: IStory): Observable<IPlotView> {
    let storyId = story.id;
    console.log("New PLot CHeking storyId ", storyId);
    let payload = "AAA" + storyId;
    let uri = `${this.getPlotsUri}/new`;
    return this.http.post<IPlotView>(uri, payload,
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

  private getPlotDaoList():Observable<IPlotView[]> {
   return this.http.get<IPlotView[]>(this.getPlotsUri,{headers:this.headers});

  }
}
