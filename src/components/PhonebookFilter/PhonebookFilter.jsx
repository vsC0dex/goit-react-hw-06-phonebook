import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filter-slice';
import styles from './phonebook-filter.module.css';

const PhonebookFilter = () => {
  const filter = useSelector(store => store.filter);
  const dispatch = useDispatch();

  const handleFilter = e => {
    const action = setFilter(e.target.value);
    dispatch(action);
  };

  return (
    <div className={styles.formGroup}>
      <label>
        Find contact by name
        <input type="text" value={filter} onChange={handleFilter} />
      </label>
    </div>
  );
};

export default PhonebookFilter;
