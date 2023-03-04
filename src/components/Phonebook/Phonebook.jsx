import { Report } from 'notiflix/build/notiflix-report-aio';

import { useSelector, useDispatch } from 'react-redux';

import PhonebookList from 'components/PhonebookList/PhonebookList';
import PhonebookFilter from 'components/PhonebookFilter/PhonebookFilter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

// import { addContacts, deleteContacts } from 'redux/contacts/contacts-actions';
// import { addContacts, deleteContacts } from 'redux/contacts/contacts-slice';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import styles from './phonebook.module.css';

const PhoneBook = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normilizedName = name.toLowerCase();
    const normilizedNumber = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normilizedName ||
        number.toLowerCase() === normilizedNumber
      );
    });
    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      Report.failure(
        'Oooops',
        `Contact with name: ${name} or number: ${number} is already in contacts`,
        'OK'
      );
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const isFiltered = Boolean(filteredContacts.length);

  return (
    <div>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Phonebook</h3>
        <div className={styles.block}>
          <PhonebookForm onSubmit={handleAddContact} />
        </div>
        <h3 className={styles.title}>Contacts</h3>
        <div className={styles.block}>
          <PhonebookFilter value={filter} handleChange={handleFilter} />

          {isFiltered && (
            <PhonebookList
              removeContact={handleDeleteContact}
              contacts={filteredContacts}
            />
          )}
          {!isFiltered && <p>No contacts in list</p>}
        </div>
      </div>
    </div>
  );
};

export default PhoneBook;
