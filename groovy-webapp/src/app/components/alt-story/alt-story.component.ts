import {Component, effect} from '@angular/core';
import {IStory} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {DnStoryService} from "../../services/dn-story.service";

@Component({
  selector: 'app-alt-story',
  templateUrl: './alt-story.component.html',
  styleUrls: ['./alt-story.component.css']
})
export class AltStoryComponent {
  story: IStory  = this.storyService.currentDnStory();

  constructor(private storyService:DnStoryService) {
    effect(() =>{
      this.story = this.storyService.currentDnStory();
    })
  }

}
