import {Component, effect} from '@angular/core';
import {Observable, of} from "rxjs";
import {ILocation, IStory} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-locations-list',
  templateUrl: './alt-locations-list.component.html',
  styleUrls: ['./alt-locations-list.component.css']
})
export class AltLocationsListComponent {

  story: IStory = this.storyService.currentDnStory();
  location$: Observable<ILocation> | undefined;
  locations = this.story.locations ? this.story.locations : [];
  activeLocation = this.storyService.currentDnLocation()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.locations = this.story.locations ? this.story.locations : [];
      this.location$ = undefined;
      console.log("constructor ",this.activeLocation);
    });
  }

  create(): void {
    this.storyService.addLocation();
  }



  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().locations?.findIndex(event => event.id == this.storyService.currentDnLocation().id);
    this.storyService.currentDnStory().locations?.splice(idx, 1);
    this.storyService.currentDnStory().locations?.push(this.storyService.currentDnLocation());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(location: ILocation): void {

  }



  select(location: ILocation) {
    console.log("Select event ",location);
    this.storyService.updateCurrentDnLocation(location);
    this.location$ = of(this.storyService.currentDnLocation());
  }


}


