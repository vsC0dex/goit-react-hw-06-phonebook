export const getContacts = store => store.contacts;

export const getFilteredContacts = ({ contacts, filter }) => {
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
