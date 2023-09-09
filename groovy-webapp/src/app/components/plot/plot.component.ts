import {Component, OnInit} from '@angular/core';
import {IPlot} from "../../models/story.model";
import {ActivatedRoute} from "@angular/router";
import {parseMappings} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit{
  plot:IPlot|undefined;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=> {
        console.log(params.get('id)'));
      }
    );
  }
}
