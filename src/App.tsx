import * as React from 'react';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';

import Header from './Header';
import SearchResults from './SearchResults';

export const App = () => {
  const [searchText, setSearchText] = React.useState('');
  const canGetResults = searchText.length > 0;

  return (
    <ChakraProvider theme={theme}>
      <Box padding={2} maxWidth={900} mx="auto">
        <Header onSubmit={setSearchText} />
        {canGetResults ? <SearchResults searchText={searchText} /> : null}
      </Box>
    </ChakraProvider>
  );
};
