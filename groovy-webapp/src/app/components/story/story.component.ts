import {Component, Input} from '@angular/core';
import {IStory} from "../../models/story.model";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  @Input() story: IStory | undefined;

}
