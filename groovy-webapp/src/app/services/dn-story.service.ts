import {Injectable, signal} from '@angular/core';
import {defaultStory, IPlot, IStory} from "../models/story.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "./cognito.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DnStoryService {


  user: string | undefined;
  currentDnStory = signal<IStory>(defaultStory);
  currentDnPlot = signal<IPlot>({name:"default"});
  dnStoryEndpoint = "http://localhost:8080/dnstory";
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});



  constructor(private http: HttpClient, private auth: CognitoService) {

  }

  updateCurrentStory(story: IStory) {
    this.currentDnStory.update(() => story);
    console.log("after current Dnstory update, ", this.currentDnStory());
  }
updateCurrentPlot(plot: IPlot) {
    this.currentDnPlot.update(() => plot);
    console.log("after current Dnplot update, ", this.currentDnPlot());
  }

  getStories(): Observable<IStory[]> {
    return this.http.get<IStory[]>(this.dnStoryEndpoint, {headers: this.headers});
  }



  newStory(): Observable<IStory> {
    return this.http.post<IStory>(this.dnStoryEndpoint, {}, {})
  }

  updateStory(): void {
    this.http.put<IStory>(this.dnStoryEndpoint, this.currentDnStory(), {headers:this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err=> console.log("error ", err),
      complete:() => this.getStories().subscribe(data => console.log("Update result", data))
    })
  }

  delete(id: string): Observable<any> {
    let uri =  `${this.dnStoryEndpoint}/${id}`;
    return this.http.delete(uri, {headers: this.headers});
  }

  addPLot():void{
    let uri =`${this.dnStoryEndpoint}/newPlot`;
    this.http.put<IStory>(uri,this.currentDnStory().id,{headers:this.headers}).subscribe(
      data => this.updateCurrentStory(data)
    );
  }
}
