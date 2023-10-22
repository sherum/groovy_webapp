import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IScene} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-scene',
  templateUrl: './alt-scene.component.html',
  styleUrls: ['./alt-scene.component.css']
})
export class AltSceneComponent {

  @Input() scene:IScene|undefined;
  @Output() saveScene = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentDnScene(<IScene>this.scene);
    this.saveScene.emit();
  }

  select(scene:IScene){}
  delete(scene:IScene){}

}
