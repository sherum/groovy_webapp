import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {IEvent, ILocation, IPerson, IScene, IThing} from "../models/story.model";
import {IPlotView} from "../models/transform.model";


@Pipe({
  name: 'uplots',
  pure: false
})

export class UniquePipe implements PipeTransform {
  transform(value: Array<IPlotView>): Array<IPlotView>{
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'id');
    }
    return value;
  }
}
