import {Component, OnInit} from '@angular/core';
import {IStory} from "../../models/story.model";
//import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../services/story.service";
import {filter, merge, scan} from "rxjs";
import {Router} from "@angular/router";

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],

})
export class StoryListComponent implements OnInit {


  story: IStory | undefined;

  errorMessages = ""


  stories$ = merge(
    this.storyService.getStories(),
    this.storyService.insertedStory$
  ).pipe(
    scan((acc, value) =>
        (value instanceof Array) ?
          [...value] : [...acc, value],
      [] as IStory[])
  );


  constructor(private storyService: StoryService, private router:Router) {
  }

  ngOnInit(): void {
    this.storyService.currentStoryObserver$.subscribe(
      storyData => this.story = storyData
    );
  }

  save(): void {
    this.storyService.updateStory(<IStory>this.story);
  }

  select(story: IStory) {
    console.log("set current story");
    this.storyService.setCurrentStory(story);
  }

  delete(story: IStory): void {
    console.log("delete pressed in component")
    this.storyService.delete(<string>story.id)
  }

  create(): void {

    this.storyService.newStory().subscribe(
        {next:  data => this.select(data),
          error: err => console.log("new Story error", err)}
    );
  }

  sync(): void {
   this.router.navigate(['home'])
     .then(r => this.router.navigate(['stories']));
  }

}
