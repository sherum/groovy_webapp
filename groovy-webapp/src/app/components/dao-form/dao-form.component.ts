import {Component, Input, OnInit} from '@angular/core';
import {IPlotDao} from "../../models/transform.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dao-form',
  templateUrl: './dao-form.component.html',
  styleUrls: ['./dao-form.component.css']
})
export class DaoFormComponent {

  // @ts-ignore
  @Input() dao: IPlotDao;



  addSubplot(): void {
  }

  onSubmit(form: NgForm) {

  }


}
