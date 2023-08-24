import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "./app/common/AuthContext";

import Routes from "./app/navigation/routes";

export default function App() {
  const [store, setStore] = useState({});
  const [cart, setCart] = useState([]);
  return (
    <>
      <AuthContext.Provider value={{ store, setStore,cart,setCart }}>
        <SafeAreaProvider>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </>
  );
}
