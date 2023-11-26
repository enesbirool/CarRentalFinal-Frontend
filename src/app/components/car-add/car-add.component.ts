import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:["", Validators.required]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message, "Successful")
      }, responseError=>{
        for (let i = 0; i < responseError.error.Error.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");       
        }
      })
    }
    else{
      this.toastrService.error("Form is missing", "Warn");
    }
  }
}
