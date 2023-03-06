import { useSelector } from 'react-redux';

import PhonebookList from 'components/PhonebookList/PhonebookList';
import PhonebookFilter from 'components/PhonebookFilter/PhonebookFilter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

import styles from './phonebook.module.css';

const PhoneBook = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const isFiltered = Boolean(filteredContacts.length);

  return (
    <div>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Phonebook</h3>
        <div className={styles.block}>
          <PhonebookForm />
        </div>
        <h3 className={styles.title}>Contacts</h3>
        <div className={styles.block}>
          <PhonebookFilter />

          {isFiltered && <PhonebookList />}
          {!isFiltered && <p>No contacts in list</p>}
        </div>
      </div>
    </div>
  );
};

export default PhoneBook;
