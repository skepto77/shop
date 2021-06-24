import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
} from '../constants/cart';

const cart = (state = { cartItems: [] }, { type, payload }) => {
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
      console.log(payload)
        const updatedItemsInCart = state.cartItems.filter((item) => item.id !== payload);
        return {
          ...state,
          cartItems: [...updatedItemsInCart],
        }
    default:
      return state;
  }
};

export { cart };
