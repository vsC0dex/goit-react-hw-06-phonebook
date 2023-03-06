import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts-slice';

import styles from './phonebook-list.module.css';

const PhonebookList = () => {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);

  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const listContactsByFilter = filterContacts();

  const contact = listContactsByFilter.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}
      <button onClick={() => handleDeleteContact(id)} className={styles.btn}>
        Delete
      </button>
    </li>
  ));
  return <ol className={styles.list}>{contact}</ol>;
};

export default PhonebookList;
