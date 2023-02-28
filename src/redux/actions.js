import { ADD_CONTACT, DELETE_CONTACT } from './types';
import { nanoid } from 'nanoid';

export const addContacts = payload => {
  return {
    type: ADD_CONTACT,
    payload: {
      id: nanoid(),
      ...payload,
    },
  };
};

export const deleteContatcs = payload => {
  return {
    type: DELETE_CONTACT,
    payload,
  };
};
