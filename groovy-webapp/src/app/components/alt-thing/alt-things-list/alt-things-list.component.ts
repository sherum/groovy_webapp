import {Component, effect} from '@angular/core';
import {IThing, IStory} from "../../../models/story.model";
import {Observable, of} from "rxjs";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-things-list',
  templateUrl: './alt-things-list.component.html',
  styleUrls: ['./alt-things-list.component.css']
})
export class AltThingsListComponent {

  story: IStory = this.storyService.currentDnStory();
  thing$: Observable<IThing> | undefined;
  things = this.story.things ? this.story.things : [];
  activeThing = this.storyService.currentDnThing()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.things = this.story.things ? this.story.things : [];
      this.thing$ = undefined;
      console.log("constructor ",this.activeThing);
    });
  }

  create(): void {
    this.storyService.addThing();
  }



  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().things?.findIndex(event => event.id == this.storyService.currentDnLocation().id);
    this.storyService.currentDnStory().things?.splice(idx, 1);
    this.storyService.currentDnStory().things?.push(this.storyService.currentDnThing());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(thing: IThing): void {

  }



  select(thing: IThing) {
    console.log("Select event ",thing);
    this.storyService.updateCurrentDnThing(thing);
    this.thing$ = of(this.storyService.currentDnThing());
  }


}

