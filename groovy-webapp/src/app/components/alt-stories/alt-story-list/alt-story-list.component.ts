import {Component, computed, OnInit, signal, Signal} from '@angular/core';
import {defaultStory, IStory} from "../../../models/story.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-story-list',
  templateUrl: './alt-story-list.component.html',
  styleUrls: ['./alt-story-list.component.css']
})
export class AltStoryListComponent implements OnInit {

  activeStory = computed(() => this.storyService.currentDnStory);
  // @ts-ignore
  story: IStory = this.activeStory();
  stories: IStory[] | undefined;

  errorMessages = ""


  constructor(private storyService: DnStoryService) {
  }


  ngOnInit() {
    this.storyService.getStories().subscribe(data => {
      this.stories = data;
      if (!this.stories?.find(story => story.id == defaultStory.id)) {
        this.stories.push(defaultStory)
      }
    });

  }

  save(): void {
    console.log("save pressed")
    this.storyService.updateStory();
  }


  select(id: string) {

    // @ts-ignore
    console.log("Selected DN ID", id ? id : null);
    let selected = <IStory>this.stories?.find(story => story.id == id);
    this.storyService.updateCurrentStory(selected);
    // @ts-ignore
    //console.log("Selected ID", story.id?id:null);
    // @ts-ignore
    // this.storyService.updateCurrentStory(story);
    //this.storyService.setCurrentStory(this.story.id);
    // this.story = this.stories?.find(story => story.id == this.storyService.currentDnStory().id);

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
        this.story = this.storyService.currentDnStory();
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

