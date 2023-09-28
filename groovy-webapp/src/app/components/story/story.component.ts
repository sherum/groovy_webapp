import {Component, Input, OnInit} from '@angular/core';
import {IStory} from "../../models/story.model";
import {ActivatedRoute} from "@angular/router";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  //@Input() story: IStory | undefined;
  story: IStory | undefined;

  constructor(private route: ActivatedRoute, private storyService: StoryService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sid = params.get('id');
      this.getStory(<string>sid);

    });
  }

  getStory(sid:string):void{
    this.storyService.getStory(sid).subscribe(
      data => this.story = data
    )
  }

}
