import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPerson} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-person',
  templateUrl: './alt-person.component.html',
  styleUrls: ['./alt-person.component.css']
})
export class AltPersonComponent {

  @Input() person:IPerson|undefined;
  @Output() savePerson = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentPerson(<IPerson>this.person);
    this.savePerson.emit();
  }

  select(person:IPerson){}
  delete(person:IPerson){}

}
