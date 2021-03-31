import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { CardService } from 'src/app/services/card.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  rental:Rental;
  cardForm:FormGroup;
  card:Card;
  cardExist:Boolean;
  closeResult = '';
  user:User;
  cardNo:number;
  isModalShow:boolean = true;

  constructor(private activatedRoute:ActivatedRoute, 
    private cardService:CardService, 
    private rentalService:RentalService, 
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
      }
    })
    this.createCardForm();
  }

  createCardForm(){
    this.cardForm = this.formBuilder.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      cvvNumber:["", Validators.required],
      cardNumber:["", Validators.required],
      expireDate:["", Validators.required]
    })
  }

  async rent(){
    if(this.cardForm.valid){
      let cardModel = Object.assign({}, this.cardForm.value)
      this.cardNo = cardModel.cardNumber;
      this.cardExist = await this.doesCardExist(cardModel);
      if(this.cardExist){
        this.rentalService.addRental(this.rental)
        this.toastrService.success("Rented", "The car is rented successfully");
      }
    }
    else{
      this.toastrService.error("Form is missing", "Warn");
    }
  }

  async doesCardExist(card:Card){
    return (await (await this.cardService.doesCardExist(card).toPromise()).success )
  }

  async getByCardNumber(cardNumber:number){
    return (await(this.cardService.getByCardNumber(cardNumber)).toPromise()).data[0]
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  save(){
    let email = this.localStorageService.getItem('email')
    if(email){
      this.customerService.getUserByMail(email).subscribe(response=>{
        this.user = response.data
      });
    }

    let customerModel = {firstName: this.user.firstName, lastName: this.user.lastName, cardNumber: this.cardNo}
    this.customerService.update(customerModel);
    this.isModalShow =false;
  }
}
