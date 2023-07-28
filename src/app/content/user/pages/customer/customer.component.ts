import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../Interfaces/Customer.interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  titulo:string=""
  form!:FormGroup
  Customer:Customer[]=[]
  idProduct:string=""
  @ViewChild('closebutton') closebutton:any
  constructor(private _fb:FormBuilder, private _user:UserService) {
    this.form= _fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phone:['',Validators.required],
      zipcode:['',Validators.required],
      street:['',[Validators.required, Validators.maxLength(10)]],
    })
  }

  ngOnInit(): void {
    this.LoadCustomer()
   }
   LoadCustomer(){
   this._user.GetAllCustomer().subscribe({
     next:(response:Customer[])=>{

       this.Customer = response


     },error:ero=>{
       console.log(ero);
     }
   })
 }
   modal(title:string,item?:Customer){
     this.titulo=title

     if (title ==='Edit Customer') {
       this.idProduct =item!._id
       this._user.GetCustomerById(item!._id).subscribe({
         next:(response:Customer)=>{
           this.form.controls["firstname"].setValue(response.firstname)
           this.form.controls["lastname"].setValue(response.lastname)
           this.form.controls["phone"].setValue(response.phone)
           this.form.controls["street"].setValue(response.street)
           this.form.controls["zipcode"].setValue(response.zipCode)

         },error:ero=>{
           console.log(ero);
         }
       })
     }

   }
   guardar(){
     if (this.titulo==='New Customer') {
       this._user.InsertCustomer(this.form.value).subscribe({
         next:(response:boolean)=>{
           if (response) {
             this.closebutton.nativeElement.click();
             this.LoadCustomer()

             this.form.reset()
           }

         },error:ero=>{
           console.log(ero);
         }
       })
     }else if(this.titulo==='Edit Customer'){

       this._user.UpdateCustomer(this.form.value, this.idProduct).subscribe({
         next:(response:boolean)=>{

           if (response) {
             this.closebutton.nativeElement.click();
             this.LoadCustomer()
             this.form.reset()
           }else{
            console.log(response);

           }



         },error:ero=>{
           console.log(ero);
         }
       })
     }

   }

}
