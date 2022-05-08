import { createStore } from "redux";
import rootreducer from "./rootreducer";

// export default function configStore() {
//   return legacy_createStore(rootreducer);
// }

export const store = createStore(
  rootreducer,
)
