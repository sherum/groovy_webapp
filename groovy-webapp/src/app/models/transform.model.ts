import {IPlot} from "./story.model";

export interface IPlotView {
  plot:IPlot;
  plotChildren:IPlot[];
  topPlot:boolean;
}
export interface IPlotDao{
  name:string;
  id?:string;
  parentId?:string;
  type?:string;
  description?:string;
  subplots?:Array<IPlotDao>;
}

