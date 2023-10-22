import {Component, computed, OnInit} from '@angular/core';
import {defaultStory, IStory} from "../../../models/story.model";
//import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../../services/story.service";

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],

})
export class StoryListComponent implements OnInit{

  activeStory = computed(() => this.storyService.currentStory);
  // @ts-ignore
  story: IStory = this.activeStory();
  stories: IStory[] | undefined;

  errorMessages = ""


  constructor(private storyService: StoryService) {
   }


ngOnInit(){
    this.storyService.getStories().subscribe(data => {
        this.stories = data;
        if (!this.stories?.find(story => story.id == defaultStory.id)){
          this.stories.push(defaultStory)
        }
      });
  }

  save(): void {

    console.log("save pressed...saving,");
    // this.storyService.updateStory(currentStory);
    this.storyService.updateStory();
  }

  select(id: string) {
    // @ts-ignore
    console.log("Selected ID", id ? id : null);
    let selected = <IStory>this.stories?.find(story => story.id == id);
    this.storyService.updateCurrentStory(selected);
    // @ts-ignore
    // this.storyService.setCurrentStory(this.story.id);
  }

  delete(id: string): void {
    console.log("Delete story with id of: ", id);
    this.storyService.delete(id).subscribe(
      (data: void) => {
        // @ts-ignore
        let idx: number = this.stories?.findIndex(story => story.id == id);
        this.stories?.splice(idx, 1);
        // @ts-ignore
        this.storyService.updateCurrentStory(this.stories[idx - 1] ? this.stories[idx - 1] : defaultStory);
        this.story = this.storyService.currentStory();
      },
      (err: any) => console.log(err)
    );
  }

  sync(): void {
    /// this.showForm = !this.showForm;
  }

  create(): void {
    this.storyService.newStory().subscribe(
      data => {
        this.stories?.push(data);
        // @ts-ignore
        this.select(data?.id);
      },
      (err: any) => console.log("new story error", err)
    );
  }

}
