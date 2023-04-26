import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import Header from './Header';
import SearchResults from './SearchResults';

export const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const canGetResults = searchText.length > 0;

  return (
    <ChakraProvider theme={theme}>
      <Header onSubmit={setSearchText} />
      {canGetResults ? <SearchResults searchText={searchText} /> : null}
    </ChakraProvider>
  );
};
