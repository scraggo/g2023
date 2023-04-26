// import * as React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

import { useNPMSearch } from './hooks';

type Props = {
  searchText: string;
};

interface Result {
  package: {
    description: string;
    name: string;
    version: string;
    links: {
      npm: string;
    };
  };
}

const Wrapper = ({ children }: { children?: any }) => (
  <Box as="main" mt={2}>
    {children}
  </Box>
);

export default function SearchResults({ searchText }: Props) {
  const { data = [], error, isLoading } = useNPMSearch(searchText);

  if (isLoading) {
    return <Wrapper>loading</Wrapper>;
  }

  if (error) {
    console.error(error);
    return <Wrapper>error - see console</Wrapper>;
  }

  return (
    <Wrapper>
      {data.map((result: Result) => {
        const { package: pkg } = result;
        const { description, links, name } = pkg;
        const { npm } = links;
        return (
          <Box
            as="section"
            borderBottom="1px solid"
            borderBottomColor="gray.100"
            pb={2}
            mb={2}
            key={name}
          >
            <Text as="b">
              <Link href={npm}>{name}</Link>
            </Text>
            <br />
            <Text>{description}</Text>{' '}
          </Box>
        );
      })}
    </Wrapper>
  );
}
