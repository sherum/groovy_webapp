import {Component, OnInit} from '@angular/core';
import {data, IStory} from "../../models/story.model";
//import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../services/story.service";
import {filter} from "rxjs";

@Component({
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.css'],

})
export class StoryListComponent implements OnInit {


    story: IStory | undefined;

    errorMessages = ""


    stories$ = this.storyService.getStories();


    constructor(private storyService: StoryService) {}

    ngOnInit(): void {
        this.storyService.currentStoryObserver$.subscribe(
            storyData => this.story = storyData
        );
    }

    save(): void {
        // console.log("save pressed")
        // let currentStory = <IStory>this.story;
        // if (currentStory.id) {
        //     console.log("Update happened")
        //     this.storyService.updateStory(currentStory);
        // } else {
        //     console.log("Not update happened")
        //     let story$ = this.storyService.newStory();
        //     (story$).subscribe(data => this.story = data);
        // }
    }

    select(story:IStory) {
       this.storyService.setCurrentStory(story);
    }

    delete(story:IStory): void {

    }

    create(): void {
        // this.storyService.newStory().subscribe(
        //     data => {
        //         this.stories?.push(data);
        //         // @ts-ignore
        //         this.select(data?.id);
        //     },
        //     (err: any) => console.log("new Story error", err)
        // );
    }

    sync(): void {
        /// this.showForm = !this.showForm;
    }

}
