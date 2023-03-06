import { Report } from 'notiflix/build/notiflix-report-aio';

import initialState from 'shared/initialState';

import styles from './phonebook-form.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { addContact } from 'redux/contacts/contacts-slice';

const PhonebookForm = () => {
  const contacts = useSelector(store => store.contacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    initialState[e.target.name] = e.target.value;
    return;
  };

  const onAddContact = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      Report.failure(
        'Oooops',
        `Contact with name: ${data.name} is already in contacts`,
        'OK'
      );
      return;
    }
    const action = addContact(data);
    dispatch(action);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact(initialState);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter the name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Number</label>
        <input
          type="tel"
          name="number"
          placeholder="Enter the number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.btn}>
        Add contact
      </button>
    </form>
  );
};

export default PhonebookForm;

// const PhonebookForm = ({ onSubmit }) => {
//   const [state, setState] = useState({ ...initialState });

//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     setState(prevState => {
//       return { ...prevState, [name]: value };
//     });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     onSubmit({ ...state });
//     setState({ ...initialState });
//   };

//   const { name, number } = state;

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className={styles.formGroup}>
//         <label>Name:</label>
//         <input
//           placeholder="Type name"
//           type="text"
//           name="name"
//           onChange={handleChange}
//           value={name}
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label>Number:</label>
//         <input
//           placeholder="Type number"
//           type="tel"
//           name="number"
//           onChange={handleChange}
//           value={number}
//         />
//       </div>
//       <button className={styles.btn} type="submit">
//         Add contact
//       </button>
//     </form>
//   );
// };

// export default PhonebookForm;

// PhonebookForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
