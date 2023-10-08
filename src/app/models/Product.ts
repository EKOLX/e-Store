export default interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartProduct extends Product {
  quantity: number;
}
