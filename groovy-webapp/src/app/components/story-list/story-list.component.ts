import{Component} from '@angular/core';
import {IStory} from "../../models/story.model";
//import {catchError, combineLatest, EMPTY, map, merge, Observable, Subject, tap} from "rxjs";
import {StoryService} from "../../services/story.service";

@Component({
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],

})
export class StoryListComponent {

  story:IStory|undefined;

  errorMessages= ""


stories:IStory[]|undefined;


  constructor(private storyService:StoryService) {
    this.storyService.getStories().subscribe(data =>
    this.stories = data
    );
  }

  save():void{
    console.log("save pressed")
    let currentStory = <IStory>this.story;
    if(currentStory.id){
      console.log("Update happened")
      this.storyService.updateStory(currentStory);
    }else{
      console.log("Not update happened")
      let story$ = this.storyService.newStory();
      (story$).subscribe(data => this.story = data);
    }
  }

  select(id:string){
   // @ts-ignore
    console.log("Selected ID", id?id:null);
    this.story = this.stories?.find(story => story.id == id);
  }

  delete(id:string):void{
    console.log("Delete story with id of: ", id);
    this.storyService.delete(id).subscribe(
      (data:void) => {
        // @ts-ignore
        let idx:number = this.stories?.findIndex(story =>story.id == id);
        this.stories?.splice(idx,1);
       this.story = undefined;
      },
      (err:any)=>console.log(err)
    );
  }

  create():void{
    this.storyService.newStory().subscribe(
      data => {
        this.stories?.push(data);
        // @ts-ignore
        this.select(data?.id);
      },
      (err:any)=>console.log("new Story error",err)
    );
  }

  sync():void{
  /// this.showForm = !this.showForm;
  }

}
