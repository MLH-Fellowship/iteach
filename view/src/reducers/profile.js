import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      console.log("action.payload "+action.payload);
      return {
        ...action.payload
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
