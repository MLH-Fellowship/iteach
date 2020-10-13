import {
  APPLY_TO_TEACH_UNLOADED,
  APPLY_TO_TEACH,
  UPDATE_FIELD_APPLY_TO_TEACH,
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case APPLY_TO_TEACH:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case APPLY_TO_TEACH_UNLOADED:
      return {};
    case UPDATE_FIELD_APPLY_TO_TEACH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};
