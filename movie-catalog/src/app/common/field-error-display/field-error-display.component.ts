import { Component, Input } from "@angular/core";
import { AbstractControl, AbstractControlDirective } from '@angular/forms';


type ValidatorsId = "required" | "pattern";

interface FieldError {
[key: string]: string;
}

const fieldErrors = {
required: "Field is required",
pattern: "Format not valid",
}

interface CustomErrorEntry {
id : string;
text : string;
}

@Component({
 selector: "app-field-error-display",
 templateUrl: "./field-error-display.component.html",
 styleUrls: ["./field-error-display.component.css"],
})
export class FieldErrorDisplayComponent {
 @Input() fieldNgModel: 
 | AbstractControlDirective 
 | AbstractControl
// | any                      
 | null;
 @Input() customFieldErrors?: CustomErrorEntry[] | null = null;
 
 fieldErrorObject : FieldError;

 constructor() {
 this.fieldNgModel = null;
  this.fieldErrorObject = {
   required: "Field is required",
   pattern: "Format not valid",
   minlength: "Minimum of 3 characters",
   min: "Release date must be over 1900",
   max: "Release date must be under 2100"
 }
}
ngOnInit(): void {
  if (this.customFieldErrors) {
   this.customFieldErrors.map(customError => this.fieldErrorObject[customError.id] = customError.text)
   }

}
public getErrorMessage(error: any, key: any = "") { //HANDMADE METHOD; Why in the world was the function undefinded?
  console.log(error, key)
  return this.fieldErrorObject[error]
}
}

