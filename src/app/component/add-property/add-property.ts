import { Component } from "@angular/core";
import { Iproperty } from "../../models/Iproperty";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PropertyService } from "../../services/property";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-property.html',
  styleUrls: ['./add-property.css']
})
export class AddProperty {

  newproperty: Iproperty = {} as Iproperty;

  constructor(private _property: PropertyService,private _router: Router) {}

  addnewProperty() {
  this._property.addProperty(this.newproperty);
  this.newproperty = {} as Iproperty; 
  alert("doen");
  this._router.navigateByUrl("/properties");
}
}
