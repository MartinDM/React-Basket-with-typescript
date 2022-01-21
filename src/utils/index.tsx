export const calcTotalQty = (basketItems): number =>
basketItems?.length
  ? basketItems.reduce((acc, curr) => acc + curr.qty, 0)
: 0;

export const calcBasketTotalCost = (basketItems) => {
  if ( basketItems?.length < 1 ) return 0;
  return basketItems.reduce( (p, item) => (+ p + item.qty * item.price).toFixed(2), 0);
}