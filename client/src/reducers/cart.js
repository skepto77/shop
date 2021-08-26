import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_DELIVERY_METHOD,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cart';

const cart = (state = { cartItems: [], shippingAdress: {} }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const itemInCart = state.cartItems.find((item) => item.id === payload.id);
      if(itemInCart) {
        const idx = state.cartItems.indexOf(itemInCart);
        itemInCart.quantity += payload.quantity;

        return {
          ...state,
          cartItems: [...state.cartItems.slice(0, idx), itemInCart, ...state.cartItems.slice(idx + 1)]
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload]
        }
      }
    case CART_REMOVE_ITEM:
        const updatedItemsInCart = state.cartItems.filter((item) => item.id !== payload);
        return {
          ...state,
          cartItems: [...updatedItemsInCart],
        }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAdress: payload,
      }
    case CART_SAVE_DELIVERY_METHOD:
      return {
        ...state,
        delivery: payload,
      }
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: payload,
        }
    default:
      return state;
  }
};

export { cart };
