export interface Products {
  _id:string;
  upc:   string;
  name:  string;
  mfgr:  string;
  model: string;
  price: number;
  stock: number;
}
export interface ProductsListOrder {
  _id:string;
  name:  string;
  cantidad:  number;
  price: number;
  subtotal:number;
}
