import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { useSelector, useDispatch } from 'react-redux';

import PhonebookList from 'components/PhonebookList/PhonebookList';
import PhonebookFilter from 'components/PhonebookFilter/PhonebookFilter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import { addContacts, deleteContatcs } from 'redux/actions';

import styles from './phonebook.module.css';

// const PhoneBook = () => {
//   const [contacts, setContacts] = useState(() => {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     return contacts ? contacts : [];
//   });
//   // const contacts = useSelector(store => store.contact);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const isDublicate = (name, number) => {
//     const normilizedName = name.toLowerCase();
//     const normilizedNumber = number.toLowerCase();
//     const result = contacts.find(({ name, number }) => {
//       return (
//         name.toLowerCase() === normilizedName ||
//         number.toLowerCase() === normilizedNumber
//       );
//     });
//     return Boolean(result);
//   };

//   const addContact = ({ name, number }) => {
//     if (isDublicate(name, number)) {
//       return Report.failure(
//         'Oooops',
//         `Contact with name: ${name} or number: ${number} is already in contacts`,
//         'OK'
//       );
//     }
//     setContacts(prevContacts => {
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       return [newContact, ...prevContacts];
//     });
//   };

//   const removeContact = id => {
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== id)
//     );
//   };

//   const handleFilter = ({ target }) => setFilter(target.value);

//   const getFilteredContacts = () => {
//     if (!filter) {
//       return contacts;
//     }
//     const normilizedFilter = filter.toLowerCase();

//     const result = contacts.filter(({ name, number }) => {
//       return (
//         name.toLowerCase().includes(normilizedFilter) ||
//         number.toLowerCase().includes(normilizedFilter)
//       );
//     });
//     return result;
//   };

//   const filteredContacts = getFilteredContacts();
//   const isFiltered = Boolean(filteredContacts.length);

//   return (
//     <div>
//       <div className={styles.wrapper}>
//         <h3 className={styles.title}>Phonebook</h3>
//         <div className={styles.block}>
//           <PhonebookForm onSubmit={addContact} />
//         </div>
//         <h3 className={styles.title}>Contacts</h3>
//         <div className={styles.block}>
//           <PhonebookFilter handleChange={handleFilter} />
//           {isFiltered && (
//             <PhonebookList
//               removeContact={removeContact}
//               contacts={filteredContacts}
//             />
//           )}
//           {!isFiltered && <p>No contacts in list</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

const PhoneBook = () => {
  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'));
  //   return contacts ? contacts : [];
  // });
  const contacts = useSelector(store => store.contacts);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const isDublicate = (name, number) => {
    console.log(name);
    console.log(number);
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
      return Report.failure(
        'Oooops',
        `Contact with name: ${name} or number: ${number} is already in contacts`,
        'OK'
      );
    }

    const action = addContacts({ name, number });
    dispatch(action);
  };

  const handleDeleteContact = id => {
    const action = deleteContatcs(id);
    console.log(action);
    dispatch(action);
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normilizedFilter = filter.toLowerCase();

    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normilizedFilter) ||
        number.toLowerCase().includes(normilizedFilter)
      );
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();
  // const isFiltered = Boolean(filteredContacts.length);

  return (
    <div>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Phonebook</h3>
        <div className={styles.block}>
          <PhonebookForm onSubmit={handleAddContact} />
        </div>
        <h3 className={styles.title}>Contacts</h3>
        <div className={styles.block}>
          <PhonebookFilter handleChange={handleFilter} />
          <PhonebookList
            removeContact={handleDeleteContact}
            contacts={filteredContacts}
          />
          {/* {isFiltered && <PhonebookList contacts={filteredContacts} />}
          {!isFiltered && <p>No contacts in list</p>} */}
        </div>
      </div>
    </div>
  );
};

export default PhoneBook;
