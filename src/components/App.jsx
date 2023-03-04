import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/store';

import PhoneBook from './Phonebook/Phonebook';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <PhoneBook />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
