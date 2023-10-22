// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {IPlot} from "../../../models/story.model";
// import {ActivatedRoute} from "@angular/router";
// import {parseMappings} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
// import {async, Observable} from "rxjs";
// import {PlotService} from "../../../services/plot.service";
//
// @Component({
//   selector: 'app-plot',
//   templateUrl: './plot.component.html',
//   styleUrls: ['./plot.component.css']
// })
// export class PlotComponent implements OnInit{
//  @Input() plot:IPlot|undefined;
//  @Output() savePlot = new EventEmitter();
//   constructor(private plotService:PlotService) {
//   }
//
//   ngOnInit(): void {
//
//   }
//   save(){
//    this.plotService.updateCurrentPlot(<IPlot>this.plot);
//    this.savePlot.emit();
//   }
//
// }
