import produce from "immer";

const initialState = {
  items: [],
};

export const ADD_ITEM = 'restaurants/ADD_ITEM';

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};

export default (state = initialState, action) => {
  if (action.type === 'ADD_ITEM') {
    const result = produce(state, (draft) => {
      draft.items.push(action.payload);
      return draft;
    });
    state = { ...result };
  }
  return state;
};

