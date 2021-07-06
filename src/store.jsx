import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";

const getcart = (
  state = { products: [], numberCart: 0, carts: [] },
  action
) => {
  switch (action.type) {
    case "GET_ALL_CART":
      return {
        loading: true,
        products: action.payload,
        numberCart: action.payload,
      };
    case "FETCH_ERROR":
      return {
        carts: [],
        error: "error",
      };
    case "ADD_CART":
      state.products.map((item) => {
        console.log(item);
      });
    default:
      return state;
  }
};

const addProduct = (state = { carts: [], numberCart: 0 }, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        loading: true,
        carts: action.payload,
        numberCart: action.payload,
      };
    case "FETCH_ERROR":
      return {
        carts: [],
        error: "error",
      };
    case "ADD_CART":
      return {
        numberCart: action.payload,
      };
    default:
      return state;
  }
};
const initProduct = {
  numberCart: 0,
  carts: [],
  products: [],
};

// function getcart(state = initProduct, action) {
//   switch (action.type) {
//     case "GET_ALL_CART":
//       return {
//         ...state,
//         products: action.payload,
//       };
//     case "GET_NUMBER_CART":
//       return {
//         ...state,
//       };
//     case "ADD_CART":
//       if (state.numberCart === 0) {
//         let cart = {
//           id: action.payload.id,
//           quantity: 1,
//           name: action.payload.title,
//           image: action.payload.description,
//           price: action.payload.price,
//         };
//         state.carts.push(cart);
//       } else {
//         let check = false;
//         state.carts.map((item, key) => {
//           if (item.id === action.payload.id) {
//             state.carts[key].quantity++;
//             check = true;
//           }
//         });
//         if (!check) {
//           let _cart = {
//             id: action.payload.id,
//             quantity: 1,
//             name: action.payload.title,
//             image: action.payload.description,
//             price: action.payload.price,
//           };
//           state.carts.push(_cart);
//         }
//       }
//       return {
//         ...state,
//         numberCart: state.numberCart + 1,
//       };
//     case "INCREASE_QUANTITY":
//       state.numberCart++;
//       state.quantity++;

//       // state.carts[action.payload].quantity++;

//       return {
//         ...state,
//       };
//     case "DECREASE_QUANTITY":
//       let quantity = state.carts[action.payload].quantity;
//       if (quantity > 1) {
//         state.numberCart--;
//         state.carts[action.payload].quantity--;
//       }

//       return {
//         ...state,
//       };
//     case "DELETE_CART":
//       let quantity_ = state.carts[action.payload].quantity;
//       return {
//         ...state,
//         numberCart: state.numberCart - quantity_,
//         carts: state.carts.filter((item) => {
//           return item.id !== state.carts[action.payload].id;
//         }),
//       };
//     default:
//       return state;
//   }
// }
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const reducers = combineReducers({
  getcart,
  addProduct,
});

const persistedState = loadState();
const store = createStore(reducers, persistedState);
// store.subscribe(() => console.log(saveState(store.getState())))

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
export default store;
