import { MENU_TOGGLE } from "../Actions";

const initialState = false;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case MENU_TOGGLE:
          return {
            ...state,
            menuToggle: payload,
          };
          default:
            return state;
        }
}