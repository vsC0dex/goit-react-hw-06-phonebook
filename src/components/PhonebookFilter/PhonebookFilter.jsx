import PropTypes from 'prop-types';

import styles from './phonebook-filter.module.css';

const PhonebookFilter = ({ handleChange, value }) => {
  return (
    <div className={styles.formGroup}>
      <label>Find contacts by name or number</label>
      <input
        value={value}
        name="filter"
        onChange={handleChange}
        placeholder="Filter contacts"
      />
    </div>
  );
};

export default PhonebookFilter;

PhonebookFilter.propTypes = {
  handleChange: PropTypes.func,
};
