import { connect } from "react-redux";

import { createSelector } from "reselect";

interface CartProps {
  cart: any;
  total: number;
  totalWithShipping: number;
  addProduct: () => void;
  setShipping: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  total,
  totalWithShipping,
  addProduct,
  setShipping,
}) => {
  return (
    <div>
      <h1>Carrinho</h1>

      <p>
        Items: <strong>{cart.items.length}</strong>
      </p>

      <p>
        Frete: <strong>{cart.shipping_value}</strong>
      </p>

      <p>
        Total: <strong>{total}</strong>
      </p>

      <p>
        Total + Frete: <strong>{totalWithShipping}</strong>
      </p>

      <button onClick={addProduct}>Adicionar produto</button>
      <button onClick={setShipping}>Calcular frete</button>
    </div>
  );
};

const calculateTotal = createSelector(
  (state: any) => state.items,
  (items: any) => {
    console.log("triggering calculateTotal only when I change state items");
    return items.reduce((total: number, item: any) => total + item.price, 0);
  }
);

const calculateTotalWithShippingValue = createSelector(
  (state: any) => state.items,
  (state: any) => state.shipping_value,
  (items: any, shipping_value: number) => {
    console.log(
      "triggering calculateTotal only when I change state items or shipping_value"
    );
    return (
      items.reduce((total: number, item: any) => total + item.price, 0) +
      shipping_value
    );
  }
);

const mapStateToProps = (state: any) => ({
  cart: state,
  total: calculateTotal(state),
  totalWithShipping: calculateTotalWithShippingValue(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  addProduct: () => dispatch({ type: "ADD" }),
  setShipping: () => dispatch({ type: "SET_SHIPPING" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
