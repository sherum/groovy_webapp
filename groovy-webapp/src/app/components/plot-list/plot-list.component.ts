import {Component, Input} from '@angular/core';

import {PlotService} from "../../services/plot.service";
import {IPlot} from "../../models/story.model";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {

  @Input() storyId:string= "";
  plot:IPlot|undefined;
 @Input() plots:IPlot[]|undefined;

  constructor(private plotService:PlotService) {
  }

  create():void{
      if (this.storyId?.length <= 5) {
         console.log("No story has been selected")
      } else {
          // @ts-ignore
          this.plotService.newPlot().subscribe(
              data => {
                  this.plots?.push(data);
                  console.log("the new Plot ", data);
                  // @ts-ignore
                  this.select(data?.id);
              },
              (err: any) => console.log("new Plot error", err)
          );
      }
  }
  save():void{
    console.log("save pressed")
    let currentPlot = <IPlot>this.plot;
    if(currentPlot.id){
      console.log("Update happened")
      this.plotService.updatePlot(currentPlot);
    }else{
      console.log("Not update happened")
      // @ts-ignore
        let plot$ = this.plotService.newPlot(this.storyId);
      (plot$).subscribe(data => this.plot = data);
    }
  }


  delete(id:string):void{
    console.log("Delete plot with id of: ", id);
    this.plotService.delete(<string>this.storyId,id).subscribe(
      (data:void) => {
        // @ts-ignore
        let idx:number = this.plots?.findIndex(plot =>plot.id == id);
        this.plots?.splice(idx,1);
        this.plot = undefined;
      },
      (err:any)=>console.log(err)
    );
  }

  setParent(event:any):void{
    console.log("Set Parent  ",event);
  }
  select(id:string){
    // @ts-ignore
    console.log("Selected ID", id?id:null);
    this.plot = this.plots?.find(plot => plot.id == id);
  }


}
