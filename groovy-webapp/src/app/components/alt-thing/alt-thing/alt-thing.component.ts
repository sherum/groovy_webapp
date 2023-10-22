import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEvent, ILocation, IThing} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-thing',
  templateUrl: './alt-thing.component.html',
  styleUrls: ['./alt-thing.component.css']
})
export class AltThingComponent {

  @Input() thing:IThing|undefined;
  @Output() saveLocation = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentDnEvent(<IEvent>this.thing);
    this.saveLocation.emit();
  }

  select(thing:IThing){}
  delete(thing:IThing){}

}
