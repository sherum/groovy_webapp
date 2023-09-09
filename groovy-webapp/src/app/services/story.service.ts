import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService, IUser} from "./cognito.service";
import {BehaviorSubject, combineLatest, map, merge, Observable, of, scan, Subject, tap} from "rxjs";

import {IStory, data, newStory} from "../models/story.model";

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  user:string|undefined;
  currentStoryId:string|undefined;

  constructor(private http: HttpClient, private auth: CognitoService) {

  }


  url = "http://localhost:8080";
  getStoriesUri = `${this.url}/story`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});


  setCurrentStory(storyId:string):void{
    this.currentStoryId = storyId;
  }

  getStories():Observable<IStory[]>{
    return  this.http.get<IStory[]>(this.getStoriesUri, {headers: this.headers});
  }

  // saveStory(story:IStory):Observable<IStory>{
  //   return this.http.post<IStory>(this.getStoriesUri,story,{})
  // }

  newStory(): Observable<IStory> {
    return this.http.post<IStory>(this.getStoriesUri, {}, {})
  }

  updateStory(story:IStory):void{

    this.http.put<IStory>(this.getStoriesUri,story,{}).subscribe(
      data => data,
      err => console.log("error ",err),
      () => this.getStories().subscribe(data =>console.log("Update result",data))
    )
  }

  delete(id:string):Observable<any>{
    let uri = this.getStoriesUri+`/${id}`;
    return this.http.delete(uri,{headers:this.headers});
  }






}
