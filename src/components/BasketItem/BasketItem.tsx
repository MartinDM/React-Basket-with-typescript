import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import "./BasketItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasketContext from "contexts/BasketContext";
import { IProduct } from "types";

export const BasketItem: React.FC<IProduct> = ({ id, name, qty, unit, price, description, image }) => {
    const { basketItems, actions } = useContext(BasketContext);
    const deleteItem: any = (id) => {
        const updatedBasketItems = basketItems?.filter(item => item.id !== id);
        actions.setBasketItems(updatedBasketItems)
    }

    return (
        <div className="columns">
            <div
                className="column is-two-fifths basket__product-img"
                style={{ backgroundImage: `url('images/${image}')` }}
            >
                <img src={`images/${image}`} alt={`${name} - ${description}`} />
            </div>
            <div className="column is-two-fifths">
                <h3 className="title is-5">{name}</h3>
                <p>£{(+price).toFixed(2)}
                    /{unit ? unit : 'each'}</p>
            </div>
            <div className="column">
                <p className="has-text-right">
                    <span>{qty}</span>
                </p>
            </div>
            <div className="column has-text-right">
                <FontAwesomeIcon
                    className="basket__delete"
                    onClick={() => {
                        deleteItem(id);
                    }}
                    icon={faTrash}
                />
            </div>
        </div>
    );
}