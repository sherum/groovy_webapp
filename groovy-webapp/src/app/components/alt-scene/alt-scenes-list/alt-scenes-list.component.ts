import {Component, effect} from '@angular/core';
import {IScene, IStory} from "../../../models/story.model";
import {Observable, of} from "rxjs";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-scenes-list',
  templateUrl: './alt-scenes-list.component.html',
  styleUrls: ['./alt-scenes-list.component.css']
})
export class AltScenesListComponent {


  story: IStory = this.storyService.currentDnStory();
  scene$: Observable<IScene> | undefined;
  scenes = this.story.scenes ? this.story.scenes : [];
  activeScene = this.storyService.currentDnScene()

  constructor(private storyService: DnStoryService) {
    effect(() => {
      this.story = this.storyService.currentDnStory();
      this.scenes = this.story.scenes ? this.story.scenes : [];
      this.scene$ = undefined;
      console.log("constructor ",this.activeScene);
    });
  }

  create(): void {
    this.storyService.addScene();
  }



  save(): void {
    // @ts-ignore
    let idx: number = this.storyService.currentDnStory().scenes?.findIndex(event => event.id == this.storyService.currentDnScene().id);
    this.storyService.currentDnStory().scenes?.splice(idx, 1);
    this.storyService.currentDnStory().scenes?.push(this.storyService.currentDnScene());
  }

  update() {
    this.storyService.updateStory();

  }



  delete(scene: IScene): void {
    let idx: number = <number>this.storyService.currentDnStory().scenes?.findIndex(event => event.id == this.storyService.currentDnScene().id);
    this.storyService.currentDnStory().scenes?.splice(idx, 1);

  }



  select(scene: IScene) {
    console.log("Select scene ",scene);
    this.storyService.updateCurrentDnScene(scene);
    this.scene$ = of(this.storyService.currentDnScene());
  }


}

