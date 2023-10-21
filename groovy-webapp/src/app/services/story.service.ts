import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService, IUser} from "./cognito.service";
import {BehaviorSubject, combineLatest, map, merge, Observable, of, scan, Subject, tap} from "rxjs";

import {IStory, defaultStory, IPlot} from "../models/story.model";

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  user: string | undefined;
  currentStoryId: string | undefined;

  currentStory = signal<IStory>(defaultStory);
  // @ts-ignore
  workingStoryId = signal("AAAAA-BBBB-CCCC-DDDD");

  constructor(private http: HttpClient, private auth: CognitoService) {

  }


  url = "http://localhost:8080";
  getStoriesUri = `${this.url}/story`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  setCurrentStory(storyId: string): void {
    this.currentStoryId = storyId;
  }

  updateCurrentStory(story: IStory) {
    this.currentStory.update(() => story);
    console.log("after current story update, ", this.currentStory());
  }

  getStories(): Observable<IStory[]> {
    return this.http.get<IStory[]>(this.getStoriesUri, {headers: this.headers});
  }

  // saveStory(story:IStory):Observable<IStory>{
  //   return this.http.post<IStory>(this.getStoriesUri,story,{})
  // }

  newStory(): Observable<IStory> {
    return this.http.post<IStory>(this.getStoriesUri, {}, {})
  }

  updateStory(): void {
      this.http.put<IStory>(this.getStoriesUri, this.currentStory(), {headers:this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err=> console.log("error ", err),
      complete:() => this.getStories().subscribe(data => console.log("Update result", data))
  })
  }
  updateStoryPlot(plot:IPlot):void{
    let uri = `${this.getStoriesUri}/addPlot`;
    let story = this.currentStory();
    this.http.put<IStory>(uri, {story:story.id,plot:plot.id}, {headers:this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err=> console.log("error ", err),
      complete:() => this.getStories().subscribe(data => console.log("Update result", data))
    })

  }

  delete(id: string): Observable<any> {
    let uri = this.getStoriesUri + `/${id}`;
    return this.http.delete(uri, {headers: this.headers});
  }


}
