export const INITIAL_STATE = {
  fetching: true,
  fetchingAdditional: false,
  error: false,
  data: [],
  hasMoreUsers: true,
};

export const usersListReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START': {
      return { ...state, fetching: true, error: false };
    }
    case 'FETCH_ADDITIONAL_START': {
      return {
        ...state,
        fetching: false,
        error: false,
        fetchingAdditional: true,
      };
    }
    case 'FETCH_FAIL': {
      return {
        ...state,
        fetching: false,
        fetchingAdditional: false,
        error: action.payload,
      };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetchingAdditional: false,
        error: false,
        data: action.payload,
        hasMoreUsers: action.payload.length === 10,
      };
    }
    case 'ADD_USERS': {
      return {
        ...state,
        fetchingAdditional: false,
        data: [...state.data, ...action.payload],
        hasMoreUsers: action.payload.length === 10,
      };
    }
    default:
      return state;
  }
};
