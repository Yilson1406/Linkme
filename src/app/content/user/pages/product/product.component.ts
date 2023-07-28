import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Products } from '../../Interfaces/Porducts.interfces';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  titulo:string=""
  form!:FormGroup
  product:Products[]=[]
  idProduct:string=""
  @ViewChild('closebutton') closebutton:any
  constructor(private _fb:FormBuilder, private _user:UserService) {
    this.form= _fb.group({
      upc:['',Validators.required],
      name:['',Validators.required],
      mfgr:['',Validators.required],
      model:['',Validators.required],
      price:['',[Validators.required, Validators.pattern(/^[0-9]+([,][0-9]+)?$/)]],
      stock:['',[Validators.required, Validators.pattern(/^([0-9])*$/)]],
    })
  }

  ngOnInit(): void {
   this.LoadPorducts()
  }
LoadPorducts(){
  this._user.GetAllProducts().subscribe({
    next:(response:Products[])=>{
      this.product = response


    },error:ero=>{
      console.log(ero);
    }
  })
}
  modal(title:string,item?:Products){
    this.titulo=title

    if (title ==='Edit Product') {
      this.idProduct =item!._id
      this._user.GetProductsById(item!._id).subscribe({
        next:(response:Products)=>{
          this.form.controls["name"].setValue(response.name)
          this.form.controls["upc"].setValue(response.upc)
          this.form.controls["mfgr"].setValue(response.mfgr)
          this.form.controls["model"].setValue(response.model)
          this.form.controls["price"].setValue(response.price)
          this.form.controls["stock"].setValue(response.stock)

        },error:ero=>{
          console.log(ero);
        }
      })
    }

  }
  guardar(){
    if (this.titulo==='New Product') {
      this._user.InsertProducts(this.form.value).subscribe({
        next:(response:boolean)=>{
          if (response) {
            this.closebutton.nativeElement.click();
            this.LoadPorducts()

            this.form.reset()
          }

        },error:ero=>{
          console.log(ero);
        }
      })
    }else if(this.titulo==='Edit Product'){
      this._user.UpdateProducts(this.form.value, this.idProduct).subscribe({
        next:(response:any)=>{
          if (response) {
            this.closebutton.nativeElement.click();
            this.LoadPorducts()
            this.form.reset()
          }



        },error:ero=>{
          console.log(ero);
        }
      })
    }

  }

}
