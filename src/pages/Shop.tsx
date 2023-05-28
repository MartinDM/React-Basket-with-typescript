import Product from "../components/Product";
import PRODUCTS from "../productData";

export const Shop = (props: IShop) => {
  return (
    <div className="container">
      <div className="columns">
        {PRODUCTS.map((p) => (
          <div className="column">
            <Product
              {...p}
              price={(+p.price).toFixed(2)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

export interface IShop {
}