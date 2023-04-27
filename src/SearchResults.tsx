import * as React from 'react';
import { Box, Spinner, Text, useColorModeValue } from '@chakra-ui/react';

import { useNPMSearch } from './hooks';
import SearchResult from './SearchResult';

type Props = {
  searchText: string;
  shouldForceError: boolean;
};

const Wrapper = ({ children }: { children?: any }) => (
  <Box as="main" mt={6}>
    {children}
  </Box>
);

export default function SearchResults({ searchText, shouldForceError }: Props) {
  const {
    data = [],
    error,
    isLoading,
  } = useNPMSearch(shouldForceError ? '' : searchText);
  const colorMode = useColorModeValue('light', 'dark');

  if (isLoading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (error) {
    console.error(error);
    return <Wrapper>error - see console</Wrapper>;
  }

  return (
    <Wrapper>
      <Text as="h2" fontWeight="bold" fontSize="2xl" mb={6}>
        {data.length} packages found
      </Text>
      {data.map((result) => {
        const { name } = result.package;

        return (
          <SearchResult
            key={name}
            colorMode={colorMode}
            isMatch={searchText === name}
            result={result}
          />
        );
      })}
    </Wrapper>
  );
}
