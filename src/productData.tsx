export const PRODUCTS: IProduct[] = [
  {
    name: "Avocado",
    id: 92,
    description: "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    price: 9.22,
    image: 'avocado.jpg'
  }, {
    name: "Oranges",
    id: 66,
    description: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 98.79,
    image: 'oranges.jpg'
  }, {
    name: "Coffee",
    id: 93,
    description: "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    price: 14.66,
    image: 'coffee.jpg'
  }, {
    name: "Bread",
    id: 67,
    image: 'bread.jpg',
    description: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    price: 54.69,
  }
];
export interface IProduct {
  name: string;
  id: number;
  description: string;
  price: number;
  image: string;
  qty?: number;
}
 
export default PRODUCTS;
