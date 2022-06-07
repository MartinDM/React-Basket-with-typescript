export const calcTotalQty = (basketItems): number =>
  basketItems?.length
    ? basketItems.reduce((acc, curr) => acc + curr.qty, 0)
    : 0;

export const calcTotalCost = (basketItems) => {
  if (!basketItems) return 0;
  return basketItems.reduce((prev, curr) => prev + curr?.qty * curr?.price, 0).toFixed(2);
}