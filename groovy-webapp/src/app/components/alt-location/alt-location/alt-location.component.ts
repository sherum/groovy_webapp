import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEvent, ILocation} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-location',
  templateUrl: './alt-location.component.html',
  styleUrls: ['./alt-location.component.css']
})
export class AltLocationComponent {
  @Input() location:ILocation|undefined;
  @Output() saveLocation = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentDnEvent(<IEvent>this.location);
    this.saveLocation.emit();
  }

  select(location:ILocation){}
  delete(location:ILocation){}

}
