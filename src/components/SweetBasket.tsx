import type { CartItem} from "./bakeryData";


export type SweetBasketProps = {
  cart: CartItem[]; cartCount: number; subtotal: number; deliveryFee: number; total: number;
  increaseQuantity: (id: number) => void; decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void; placeOrder: () => void;
};

export default function SweetBasket(props: SweetBasketProps) {
  const { cart, cartCount, subtotal, deliveryFee, total, increaseQuantity, decreaseQuantity, removeFromCart, placeOrder } = props;
  return (
<section
  className="basket-section"
  id="basket"
>
  <div className="section-heading">
    <p>YOUR SWEET BASKET</p>

    <h2>
      A basket full of
      <span> happiness.</span>
    </h2>

    <span>
      Review your treats before placing your order.
    </span>
  </div>

  {cart.length === 0 ? (
    <div className="empty-cart">
      <div className="empty-cart-icon">
        🛒
      </div>

      <h3>Your Sweet Basket is empty</h3>

      <p>
        Choose something delicious from our bakery
        and it will appear here.
      </p>

      <a
        href="#cakes"
        className="primary-button"
      >
        Explore Treats
      </a>
    </div>
  ) : (
    <div className="cart-layout">
      {/* CART ITEMS */}

      <div className="cart-items">
        {cart.map((item) => (
          <div
            className="cart-item"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-info">
              <div>
                <h3>{item.name}</h3>

                {item.custom && (
                  <span className="custom-label">
                    ✨ Custom Creation
                  </span>
                )}
              </div>

              <p>
                ₹{item.price} each
              </p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    decreaseQuantity(
                      item.id
                    )
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(
                      item.id
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-right">
              <strong>
                ₹
                {item.price *
                  item.quantity}
              </strong>

              <button
                className="remove-button"
                onClick={() =>
                  removeFromCart(
                    item.id
                  )
                }
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}

      <div className="order-summary">
        <h3>Order Summary</h3>

        <div className="summary-line">
          <span>
            Items ({cartCount})
          </span>

          <strong>
            ₹{subtotal}
          </strong>
        </div>

        <div className="summary-line">
          <span>Delivery</span>

          <strong>
            ₹{deliveryFee}
          </strong>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-total">
          <span>Total</span>

          <strong>
            ₹{total}
          </strong>
        </div>

        <button
          className="place-order-button"
          onClick={placeOrder}
        >
          Place My Order 🍰
        </button>

        <p className="secure-note">
          🔒 This is a demo bakery checkout.
        </p>
      </div>
    </div>
  )}
</section>


  );
}
