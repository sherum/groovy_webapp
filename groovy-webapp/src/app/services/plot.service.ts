import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "./cognito.service";
import {Observable} from "rxjs";
import {IPlot} from "../models/story.model";
import {StoryService} from "./story.service";


@Injectable({
  providedIn: 'root'
})
export class PlotService {


  constructor(private http: HttpClient,private storyService:StoryService) {

  }


  url = "http://localhost:8080";
  getPlotsUri = `${this.url}/plot`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  getPlots(): Observable<IPlot[]> {
    return this.http.get<IPlot[]>(this.getPlotsUri, {headers: this.headers});
  }

  // savePlot(plot:IPlot):Observable<IPlot>{
  //   return this.http.post<IPlot>(this.getPlotsUri,plot,{})
  // }

  newPlot(): Observable<IPlot> {
    let storyId= this.storyService.currentStoryId;
    console.log("New PLot CHeking storyId ",storyId);
    let payload= "AAA"+storyId;
    let uri= `${this.getPlotsUri}/new`;
    return this.http.post<IPlot>(uri, payload,
        {headers:this.headers});
  }

  updatePlot(plot: IPlot): void {
    this.http.put<IPlot>(this.getPlotsUri, plot, {}).subscribe(
      data => data,
      err => console.log("error ", err),
      () => this.getPlots().subscribe(data => console.log("Update result", data))
    )
  }

  delete(storyid:string,plotId:string):Observable<any>{
    let uri = this.getPlotsUri+`/${storyid}/${plotId}`;
    return this.http.delete(uri,{headers:this.headers});
  }

}
