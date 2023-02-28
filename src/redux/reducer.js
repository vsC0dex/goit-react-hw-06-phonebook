import { ADD_CONTACT, DELETE_CONTACT } from './types';

const initialStore = {
  contacts: [],
  filter: '',
};
const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const newContacts = [...store.contacts, action.payload];
      return { ...store, contacts: newContacts };

    case DELETE_CONTACT:
      const result = store.contacts.filter(item => item.id !== action.payload);
      return { ...store, contacts: result };
    default:
      return store;
  }
};

export default reducer;
