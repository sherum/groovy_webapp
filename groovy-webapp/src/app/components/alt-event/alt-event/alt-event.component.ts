import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEvent} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-event',
  templateUrl: './alt-event.component.html',
  styleUrls: ['./alt-event.component.css']
})
export class AltEventComponent {



  @Input() event:IEvent|undefined;
  @Output() saveEvent = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentDnEvent(<IEvent>this.event);
    this.saveEvent.emit();
  }

  select(event:IEvent){}
  delete(event:IEvent){}

}
