import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../../models/story.model";
import {DnStoryService} from "../../../services/dn-story.service";

@Component({
  selector: 'app-alt-plot',
  templateUrl: './alt-plot.component.html',
  styleUrls: ['./alt-plot.component.css']
})
export class AltPlotComponent {

  @Input() plot:IPlot|undefined;
  @Output() savePlot = new EventEmitter();
  constructor(private storyService:DnStoryService) {
  }

  ngOnInit(): void {

  }
  save(){
    this.storyService.updateCurrentPlot(<IPlot>this.plot);
    this.savePlot.emit();
  }

  select(plot:IPlot){}
  createSubplot(plot:IPlot){}
  delete(plot:IPlot){}

}


