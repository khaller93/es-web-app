const searchBarReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_BAR_TEXT':
      return { ...state, searchText: action.payload ? action.payload : '' };
    case 'UPDATE_SEARCH_BAR_CATEGORIES':
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

searchBarReducer.id = 'searchBar';

export default searchBarReducer;
