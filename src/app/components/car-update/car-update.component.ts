import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  carUpdateForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private carService:CarService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["car"]){
        this.car = JSON.parse(params['car']);
      }
    }) 
    this.createUpdateCarForm();
  }

  createUpdateCarForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:["car.carId", Validators.required],
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:[""]
    })

  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message, "Successful")
      }, responseError=>{
        for (let i = 0; i < responseError.error.Error.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");       
        }
      })
    }
    else{
      this.toastrService.error("Please fill all of the areas", "Warn");
    }
  }

}
