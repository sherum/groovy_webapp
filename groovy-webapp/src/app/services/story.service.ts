import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "./cognito.service";
import {BehaviorSubject, combineLatest, map, merge, Observable, of, scan, Subject, tap} from "rxjs";

import {IStory, data, newStory} from "../models/story.model";

@Injectable({
  providedIn: 'root'
})
export class StoryService {


  url = "http://localhost:8080";
  getStoriesUri = `${this.url}/story`
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  stories$ = this.http.get<IStory[]>(this.getStoriesUri, {headers: this.headers});

  constructor(private http: HttpClient, private auth: CognitoService) {
  }


  private storyInsertedSubject = new Subject<IStory>();
  insertedStoryAction$ = this.storyInsertedSubject.asObservable();

  storiesWithAdd$ = merge(
    this.stories$,
    this.insertedStoryAction$
  ).pipe(
    scan((acc, value) =>
      (value instanceof Array) ? [...value] : [...acc, value], [] as IStory[]));


  /**
   * Story reactive selection section
   * Behavior subject
   * Public observable
   * combineLatests source
   * @private
   */
  private storySelectedSubject = new BehaviorSubject<string>("0");
  selectedStoryAction$ = this.storySelectedSubject.asObservable();

  selectedStory$ = combineLatest([
    this.stories$,
    this.selectedStoryAction$
  ]).pipe(
    map(([stories, storyId]) =>
      stories.find(story => story.id === storyId)
    ),
    tap(story => console.log("selected story ", story))
  );

  /**
   * pushes the selected story id into the source observable
   * @param id
   */
  selectedStoryChanged(id: string): void {
    this.storySelectedSubject.next(id);
    console.log("Selected Story changed ID: ",id);
  }

  /**
   * pushes a new story onto the story stack
   */
  newStory(): Observable<IStory> {
    console.log("Before New Story");

    let obsv = this.http.post<IStory>(this.getStoriesUri, {}, {headers: this.headers});
    obsv.subscribe(story => {
      this.storyInsertedSubject.next(story);
      console.log("Post story ",story);
    });
    return obsv;
  }


  addStory(story: IStory): void {
    this.storyInsertedSubject.next(story);
    console.log("updated local story ",story.id);

  }
}
