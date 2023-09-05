import{Component} from '@angular/core';
import {IStory} from "../../models/story.model";
//import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../services/story.service";

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],

})
export class StoryListComponent {

  showForm = false;
  story:IStory|undefined;

  errorMessages= ""


stories:IStory[]|undefined;

  // stories$ = this.storyService.storiesWithAdd$.pipe(
  //   tap(data => console.log(JSON.stringify(data))),
  //   catchError(err => {
  //     this.errorMessageSubject.next(err);
  //     return EMPTY;
  //   })
  // );

  constructor(private storyService:StoryService) {
    this.storyService.getStories().subscribe(data =>
    this.stories = data
    );
  }

  save():void{
    // this.storyService.selectedStory$
    //   .subscribe(currentStory=>
    //     this.storyService.addStory(<IStory>currentStory));
    // this.story$.subscribe(sto => {
    //   this.storyService.addStory(<IStory>sto);
    //   console.log("Save pressed ", sto);
    // });
  }

  select(id:string){
   // @ts-ignore
    this.story = this.stories.find(story => story.id == id);
    // }
    // console.log("Show form: ", this.showForm)
    // console.log("Id ",id);
  }

  create():void{
   // this.storyService.newStory();
  }
  sync():void{
  /// this.showForm = !this.showForm;
  }

}
