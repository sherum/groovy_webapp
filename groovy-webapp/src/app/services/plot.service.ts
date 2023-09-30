import {Injectable} from '@angular/core';
import {mergeMap, Observable, of, Subject} from "rxjs";
import {StoryService} from "./story.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPlotView} from "../models/transform.model";
import {IStory} from "../models/story.model";


@Injectable({
    providedIn: 'root'
})
export class PlotService {


    constructor(private http: HttpClient, private storyService: StoryService) { }

    selectedStory$ = this.storyService.currentStoryObserver$;
    url = "http://localhost:8080";
    plotEndpoint = `${this.url}/plot`
    headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private currentPlotSubject = new Subject<IPlotView>();
    currentPlotObserver$ = this.currentPlotSubject.asObservable();

    setCurrentPlot(plot: IPlotView): void {
        console.log("Next displayed subject ", plot)
        this.currentPlotSubject.next(plot);
    }

    private nextDeletedPlotSubject = new Subject<IPlotView>();
    nextPlotDeletedObserver$ = this.nextDeletedPlotSubject.asObservable();

    setNextDeletedPlot(plot:IPlotView):void{
      this.nextDeletedPlotSubject.next(plot);
    }

    // getStoryPlots(sid:string):Observable<IPlotView[]> {
    //     return this.getPlots()
    //         .mergeMap((data) => data.plots) // [{id: 1}, {id: 4}, {id: 3}, ..., {id: N}]
    //         .filter((data) => data.storyId === sid) // checks {id: 1}, then {id: 2}, etc
    // }

    private insertedPlotSubject = new Subject<IPlotView>();
    insertedPlot$ = this.insertedPlotSubject.asObservable();

    addPlotToInserted(plot: IPlotView): void {
        this.insertedPlotSubject.next(plot);
    }


// direct to backend methods
    getPlots(): Observable<IPlotView[]> {
        return this.http.get<IPlotView[]>(this.plotEndpoint, {headers: this.headers});
    }

    newPlot(): Observable<IPlotView> {
        return this.http.post<IPlotView>(this.plotEndpoint, {}, {})
    }

    newRefPlot(storyId:string): Observable<IPlotView>{
      let uri = `${this.plotEndpoint}/newref`;
     return this.http.post<IPlotView>(uri, {body:storyId},{headers:this.headers})

    }

    newTopPlot(): Observable<IPlotView> {
        let uri = `${this.plotEndpoint}/new`;
        return this.http.put<IPlotView>(uri, {}, {headers: this.headers});
    }

    updatePlot(): void {
        console.log("Before observable update");
        this.currentPlotObserver$.subscribe(data => console.log("Before updatePlot", data));

        this.currentPlotObserver$.subscribe(
            {
                next: plot => {
                    console.log("Updateplot current plot", plot);
                    this.http.put<IPlotView>(this.plotEndpoint, plot, {headers: this.headers}).subscribe(
                        {
                            next: data => console.log("The uploaded plot.", plot),
                            error: err => console.log("something went wrong in updatePlot ", err),
                            complete: () => this.getPlots().subscribe(data => console.log("Update result", plot))
                        })
                }
            }
        )
    }

// updatePlot(plotView: IPlotView): void {
//
//         this.http.put<IPlotView>(this.plotEndpoint, plotView, {headers: this.headers}).subscribe(
//             {
//                 next: data => console.log("The uploaded plot.", plotView),
//                 error: err => console.log("something went wrong in updatePlot ", err),
//                 complete: () => this.getPlots().subscribe(data => console.log("Update result", data))
//             })
//     }


    deletePlot(): void {

        this.nextPlotDeletedObserver$.subscribe(
            {
                next: plot => {
                    let uri = `${this.plotEndpoint}/${plot.id}`;
                    console.log("The URI: ", uri);
                    this.http.delete(uri, {headers: this.headers}).subscribe(
                        () => console.log("Delete complete")
                    );
                }
            });
    }

// deletePlot(storyId: string, plotId: string): void {
//
//         let uri = `${this.plotEndpoint}/${storyId}/${plotId}`;
//         console.log("The URI: ", uri)
//         this.http.delete(uri, {headers: this.headers}).subscribe(
//             data => {
//                 console.log("Inside the http delete")
//             },
//             error => console.log("Delete error", error),
//             () => console.log("Completed Delete")
//         );
//
//     }


    removePlot(plotId: string, children: boolean): void {
        if (children) {
            console.log("remove children");
        }
        let uri = `${this.plotEndpoint}/${plotId}`
        this.http.delete(uri, {headers: this.headers}).subscribe(
            () => console.log("delete plot complete")
        );
    }


    /**
     * return an empty plot with a new id assigned to parentid
     * @param parentId
     */
    insertChildPlot(parent:IPlotView):void {
        let uri = `${this.plotEndpoint}/subplot`
        this.http.post<IPlotView>(uri, parent, {headers: this.headers}).subscribe(
          data => this.setCurrentPlot(data)
        );
    }

    insertNewPlot(): Observable<IPlotView> {
        let uri = `${this.plotEndpoint}/insert`
        return this.http.post<IPlotView>(uri, {'storyId': "asdghj"}, {headers: this.headers})
    }

    savePlot(plot: IPlotView): Observable<IPlotView> {
        console.log("Saving this plot in plotService method 'savePlot' ", plot);
        let uri = `${this.plotEndpoint}/save`
        return this.http.post<IPlotView>(uri, {body: plot}, {headers: this.headers})
    }


}


// selectedStoryPlotList$ = this.selctedStory$.pipe(
//     map(story => story.plots)
// )
/**
 * Not sure why I think I need this.
 * @private
 private selectedPlotList = new Subject<IPlotView[]>();
 currentPlotList$ = this.selectedPlotList.asObservable()

 updatePlotList(plot: IPlotView[]): void {
 this.selectedPlotList.next(plot);
 }


 newPlot(): Observable<IPlotView> {

 console.log("New plot inserted without story ID ");

 let uri = `${this.plotEndpoint}/new`;
 return this.http.post<IPlotView>(uri, {},
 {headers: this.headers});
 }
 */
// private getPlotDaoList(): Observable<IPlotView[]> {
//     return this.http.get<IPlotView[]>(this.plotEndpoint, {headers: this.headers});
//
// }
