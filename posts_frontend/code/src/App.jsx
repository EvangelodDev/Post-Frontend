import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '$store/store';
import Posts from '$pages/Posts'

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Posts />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
