import {
  TEACHER_BOOKED,
  TEACHER_UNBOOKED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_TEACHERS_PAGE_LOADED,
  PROFILE_TEACHERS_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case TEACHER_BOOKED:
    case TEACHER_UNBOOKED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
            };
          }
          return article;
        })
      };
    case SET_PAGE:
      return {
        ...state,
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        tab: null,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        tab: action.tab,
        currentPage: 0,
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_TEACHERS_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_TEACHERS_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
