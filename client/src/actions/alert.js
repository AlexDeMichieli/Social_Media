import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//thanks to the tunk middleware we can add an extra arrow and dispatch mulitple functions at the same time
//actions and reducers linked together

//receives props from Register.js thanks to {connect}
export const setAlert = (msg, alertType) => (dispatch) => {
  //giving a random id
  const id = uuid();
  //Goes to reducers. It carries the type and the payload that the reducer returns
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    2000
  );
};
