
export interface Orders {
  _id?: string;
  date: Date;
  soldBy: string;
  total: number;
  listproduct: ProductsListOrders[];
}
export interface ProductsListOrders {
  _id:string;
  name:  string;
  Quantity:  number;
  UnitSalePreci: number;
  subtotal:number;
}

