import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService, IUser} from "./cognito.service";
import {BehaviorSubject, combineLatest, map, merge, Observable, of, scan, Subject, tap} from "rxjs";

import {IStory, data, newStory} from "../models/story.model";


@Injectable({
  providedIn: 'root'
})
export class StoryService {

  user: string | undefined;

  constructor(private http: HttpClient, private auth: CognitoService) {
  }

  url = "http://localhost:8080";
  storyEndpoint = `${this.url}/story`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  private currentStorySubject = new Subject<IStory|undefined>();
  currentStoryObserver$ = this.currentStorySubject.asObservable();

  setCurrentStory(story: IStory) {
   console.log("set current story");
    this.currentStorySubject.next(story);
  }

  private insertedStorySubject = new Subject<IStory>();
  insertedStory$ = this.insertedStorySubject.asObservable();

  // addStoryToStoryList(story: IStory): void {
  //   this.insertedStorySubject.next(story);
  // }


  ///external service calls
  getStories(): Observable<IStory[]> {
    return this.http.get<IStory[]>(this.storyEndpoint, {headers: this.headers});
  }




  newStory(): Observable<IStory> {
    return this.http.post<IStory>(this.storyEndpoint, {}, {})
  }

  updateStory(story: IStory): void {

    this.http.put<IStory>(this.storyEndpoint, story, {headers: this.headers}).subscribe(
      data => console.log("The uploaded story.", story),
      err => console.log("something went wrong in updateStory ", err),
      () => this.getStories().subscribe(data => console.log("Update result", data))
    )
  }

  updateStoryRx(story: IStory): void {
    let uri = `${this.storyEndpoint}/rx`
    this.http.put<IStory>(uri, story, {headers: this.headers}).subscribe(
      data => {
      },
      err => console.log("error ", err),
      () => this.getStories().subscribe(data => console.log("Update result", data))
    )
  }

  delete(id: string): void {
    let uri = this.storyEndpoint + `/${id}`;
    this.http.delete(uri, {headers: this.headers}).subscribe(
      data =>{},
      err => console.log("Delete Error", err),
      () => console.log("Delete completed")
    );
  }

  pushAllStories(stories: IStory[]): Observable<IStory[]> {
    let uri = `${this.storyEndpoint}/saveall`;
    this.http.put<IStory[]>(uri, stories, {headers: this.headers}).subscribe(data => {
    });
    return this.getStories();
  }


}




  // getStoriesRx(): Observable<IStory[]> {
  //   let uri = `${this.storyEndpoint}/rx`
  //   return this.http.get<IStory[]>(uri, {headers: this.headers});
  // }

// saveStory(story:IStory):Observable<IStory>{
//   return this.http.post<IStory>(this.getStoriesUri,story,{})
// }
