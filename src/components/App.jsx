import { Provider } from 'react-redux';

import store from 'redux/store';

import PhoneBook from './Phonebook/Phonebook';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PhoneBook />
      </div>
    </Provider>
  );
}

export default App;
