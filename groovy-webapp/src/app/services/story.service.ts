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
  getStoriesUri = `${this.url}/story`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  private currentStorySubject = new Subject<IStory>();
  currentStoryObserver$ = this.currentStorySubject.asObservable();

  setCurrentStory(story: IStory) {
    this.currentStorySubject.next(story);
  }

  private insertedStorySubject = new Subject<IStory>();
  insertedStory$ = this.insertedStorySubject.asObservable();

  addStoryToStoryList(story: IStory): void {
    this.insertedStorySubject.next(story);
  }


  ///external service calls
  getStories(): Observable<IStory[]> {
    return this.http.get<IStory[]>(this.getStoriesUri, {headers: this.headers});
  }

  getStoriesRx(): Observable<IStory[]> {
    let uri = `${this.getStoriesUri}/rx`
    return this.http.get<IStory[]>(uri, {headers: this.headers});
  }

  // saveStory(story:IStory):Observable<IStory>{
  //   return this.http.post<IStory>(this.getStoriesUri,story,{})
  // }

  newStory(): Observable<IStory> {
    return this.http.post<IStory>(this.getStoriesUri, {}, {})
  }

  updateStory(story: IStory): void {

    this.http.put<IStory>(this.getStoriesUri, story, {headers: this.headers}).subscribe(
      data => data,
      err => console.log("error ", err),
      () => this.getStories().subscribe(data => console.log("Update result", data))
    )
  }

  updateStoryRx(story: IStory): void {
    let uri = `${this.getStoriesUri}/rx`
    this.http.put<IStory>(uri, story, {headers: this.headers}).subscribe(
      data => {
      },
      err => console.log("error ", err),
      () => this.getStories().subscribe(data => console.log("Update result", data))
    )
  }

  delete(id: string): void {
    let uri = this.getStoriesUri + `/${id}`;
    this.http.delete(uri, {headers: this.headers}).subscribe(
      data =>{},
      err => console.log("Delete Error", err),
      () => console.log("Delete completed")
    );
  }

  pushAllStories(stories: IStory[]): Observable<IStory[]> {
    let uri = `${this.getStoriesUri}/saveall`;
    this.http.put<IStory[]>(uri, stories, {headers: this.headers}).subscribe(data => {
    });
    return this.getStories();
  }


}
