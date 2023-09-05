import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IStory, newStory} from "../../models/story.model";
import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../services/story.service";

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StoryListComponent {

  showForm = false;
  story$ = this.storyService.selectedStory$;

  private errorMessageSubject = new Subject<string>();
  errorMessages$ = this.errorMessageSubject.asObservable();




  stories$ = this.storyService.storiesWithAdd$.pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private storyService:StoryService) {
  }

  save():void{
    // this.storyService.selectedStory$
    //   .subscribe(currentStory=>
    //     this.storyService.addStory(<IStory>currentStory));
    this.story$.subscribe(sto => {
      this.storyService.addStory(<IStory>sto);
      console.log("Save pressed ", sto);
    });
  }

  select(id:string|undefined){
    if(id == "0" || undefined){
      this.showForm = true;
    }else{
      let ID = id ? id : "0";
      this.storyService.selectedStoryChanged(ID);
      this.showForm = false;
    }
    console.log("Show form: ", this.showForm)
    console.log("Id ",id);
  }

  create():void{
    this.storyService.newStory();
  }
  sync():void{
    this.showForm = !this.showForm;
  }

}
