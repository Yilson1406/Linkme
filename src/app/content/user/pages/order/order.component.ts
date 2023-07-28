import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Customer } from '../../Interfaces/Customer.interfaces';
import { Products } from '../../Interfaces/Porducts.interfces';
import { Orders, ProductsListOrders } from '../../Interfaces/Order.interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  titulo:string=""
  form!:FormGroup
  product:Products[]=[]
  productosfiltrado!:Products[];
  CustomerFilter!:Customer[];
  idOrder:string | undefined=""
  resultado_busqueda:boolean=false
  cantidad:number=1
  productselectfilter!:Products
  Customers!:Customer[]
  detalleOrden:any[]=[]
  Orders:Orders[]=[]
  CustomerSelect!:Customer
  resultado_busquedaCustomer:boolean=false
  total:number=0

  ProductListOrder:ProductsListOrders[]=[]



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
    this.LoadPorducts()
    this.LoadCustomer()
    this.Loadorder()
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


  modal(title:string,item?:Orders){
    this.titulo=title

    if (title ==='Edit Order') {
      this.idOrder =item!._id
      this._user.GetOrderById(item!._id).subscribe({
        next:(response:Orders)=>{
          console.log(response);

          this.total =response.total,
          this.ProductListOrder = response.listproduct

        },error:ero=>{
          console.log(ero);
        }
      })
    }

  }

  filtrarproductos(event:any) {


    if(event.target.value.length >3){
      this.resultado_busqueda =true
      let busqueda = event.target.value;
      let expresion = new RegExp(`${busqueda}.*`, "i");
      this.productosfiltrado = this.product.filter(productos => expresion.test(productos.name));

    }else{
      this.resultado_busqueda =false
    }
  }
  filterCustomer(event:any) {


    if(event.target.value.length >3){
      this.resultado_busquedaCustomer =true
      let busqueda = event.target.value;
      let expresion = new RegExp(`${busqueda}.*`, "i");
      this.CustomerFilter = this.Customers.filter(customer => expresion.test(customer.firstname));

    }else{
      this.resultado_busquedaCustomer =false
    }
  }
  SelectProdut(item:Products){
    this.productselectfilter = item
    this.resultado_busqueda =false
  }
  SelectCustomer(item:Customer){
    this.CustomerSelect = item
    this.resultado_busquedaCustomer =false
  }
  LoadCustomer(){
    this._user.GetAllCustomer().subscribe({
      next:(response:Customer[])=>{

        this.Customers = response


      },error:ero=>{
        console.log(ero);
      }
    })
  }
  Loadorder(){
    this._user.GetAllOrder().subscribe({
      next:(response:Orders[])=>{

        this.Orders = response


      },error:ero=>{
        console.log(ero);
      }
    })
  }
  addproduct(){
    let existeproduct = false
    this.ProductListOrder.forEach(element => {
      if (element._id === this.productselectfilter._id) {
        existeproduct =true
        element.Quantity = element.Quantity + this.cantidad
        element.subtotal = element.Quantity * element.UnitSalePreci
      }
    });
    if (!existeproduct) {
      const obejto:ProductsListOrders={
        _id:this.productselectfilter._id,
        name:this.productselectfilter.name,
        UnitSalePreci:this.productselectfilter.price,
        Quantity : this.cantidad,
        subtotal: this.cantidad * this.productselectfilter.price
      }
      this.ProductListOrder.push({... obejto})
      this.total =0
      this.ProductListOrder.forEach(element => {
        this.total = this.total+ element.subtotal
      });
      this.cantidad=0
      this.productselectfilter = {
        _id:"",
        name:'',
        price:0,
        upc:'',
        model:'',
        stock:0,
        mfgr:''

      }
    }
  }
  deleteproduct(i:number){
      this.ProductListOrder.splice(i,1)
      this.total=0
      this.ProductListOrder.forEach(element => {
        this.total = this.total+ element.subtotal
      });
  }
  save(){

    if (this.total>0) {
      const objeto:Orders={
        date:new Date,
        soldBy:'Yilson Mitte',
        total:this.total,
        listproduct:this.ProductListOrder
      }

    this._user.InsertOrder(objeto).subscribe({
      next:(response:boolean)=>{
          if (response) {
            this.ProductListOrder =[]
            this.closebutton.nativeElement.click();
            this.total=0
            this.Loadorder()
          }
      },error:er=>{
        console.log(er);

      }
    })
    }

  }
}
