import {useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from './app/common/AuthContext';

import Routes from './app/navigation/routes';
import {Provider} from 'react-redux';
import {store} from './redux/Store';
import Demo from './redux/Demo';
import Routes2 from './redux/Routes2';

export default function App() {
  // const [store, setStore] = useState({});
  // const [cart, setCart] = useState([]);
  return (
    <>
      <Provider store={store}>
        <Routes2 />
      </Provider>
      {/* <AuthContext.Provider value={{store, setStore, cart, setCart}}>
        <SafeAreaProvider>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthContext.Provider> */}
    </>
  );
}
