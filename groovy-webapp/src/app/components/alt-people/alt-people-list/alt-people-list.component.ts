import {Component, effect} from '@angular/core';
import {IPerson, IStory} from "../../../models/story.model";
import {Observable, of} from "rxjs";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-people-list',
  templateUrl: './alt-people-list.component.html',
  styleUrls: ['./alt-people-list.component.css']
})
export class AltPeopleListComponent {

  story: IStory = this.storyService.currentDnStory();
  person$: Observable<IPerson> | undefined;
  people = this.story.people ? this.story.people : [];
  activePlot = this.storyService.currentDnPerson()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.people = this.story.people ? this.story.people : [];
      this.person$ = undefined;
      console.log("constructor ",this.activePlot);
    });
  }

  create(): void {
    this.storyService.addPerson();
  }



  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().people?.findIndex(person => person.id == this.storyService.currentDnPerson().id);
    this.storyService.currentDnStory().people?.splice(idx, 1);
    this.storyService.currentDnStory().people?.push(this.storyService.currentDnPerson());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(person: IPerson): void {
    let idx: number = <number>this.storyService.currentDnStory().people?.findIndex(person => person.id == this.storyService.currentDnPerson().id);
    this.storyService.currentDnStory().people?.splice(idx, 1);
  }



  select(person: IPerson) {
    console.log("Select Person ",person);
    this.storyService.updateCurrentPerson(person);
    this.person$ = of(this.storyService.currentDnPerson());
  }


}
