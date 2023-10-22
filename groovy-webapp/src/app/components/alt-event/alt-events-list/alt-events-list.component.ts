import {Component, effect} from '@angular/core';
import {IEvent, IStory} from "../../../models/story.model";
import { DnStoryService } from 'src/app/services/dn-story.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-alt-events-list',
  templateUrl: './alt-events-list.component.html',
  styleUrls: ['./alt-events-list.component.css']
})
export class AltEventsListComponent {


  story: IStory = this.storyService.currentDnStory();
  event$: Observable<IEvent> | undefined;
  events = this.story.events ? this.story.events : [];
  activeEvent = this.storyService.currentDnEvent()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.events = this.story.events ? this.story.events : [];
      this.event$ = undefined;
      console.log("constructor ",this.activeEvent);
    });
  }

  create(): void {
    this.storyService.addEvent();
  }



  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().events?.findIndex(event => event.id == this.storyService.currentDnEvent().id);
    this.storyService.currentDnStory().events?.splice(idx, 1);
    this.storyService.currentDnStory().events?.push(this.storyService.currentDnEvent());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(event: IEvent): void {
    let idx: number = <number>this.storyService.currentDnStory().events?.findIndex(event => event.id == this.storyService.currentDnEvent().id);
    this.storyService.currentDnStory().events?.splice(idx, 1);
  }



  select(event: IEvent) {
    console.log("Select event ",event);
    this.storyService.updateCurrentDnEvent(event);
    this.event$ = of(this.storyService.currentDnEvent());
  }


}

