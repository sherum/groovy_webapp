import {IPlot} from "./story.model";



export interface IPlotView {
  name:string;
  id?:string;
  parentId?:string;
  type?:string;
  description?:string;
  subplots?:Array<IPlotView>;
}

export class PlotView implements IPlotView{
  description= "";
  id= "";
  name= "New Plot";
  parentId= "";
  type= "";
  subplots= new Array<IPlotView>();

  constructor(parentId?:string) {
    this.parentId = parentId? parentId : " ";
  }

  }




