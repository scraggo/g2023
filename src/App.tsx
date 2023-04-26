// import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import SearchResults from './SearchResults';

export const App = () => (
  <ChakraProvider theme={theme}>
    <header>
      <ColorModeSwitcher />
    </header>

    <SearchResults searchText="react-window" />
  </ChakraProvider>
);
