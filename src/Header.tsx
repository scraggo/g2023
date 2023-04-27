import * as React from 'react';
import { Box, Checkbox, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchForm from './SearchForm';

type Props = {
  onForceError: (val: any) => void;
  onSubmit: (searchText: string) => void;
  shouldForceError: any;
};

export default function Header({
  onForceError,
  onSubmit,
  shouldForceError,
}: Props) {
  const colorScheme = useColorModeValue('blackAlpha', 'gray');

  return (
    <Box as="header">
      <Flex>
        <Text as="h1" fontWeight="bold" display="block">
          npm +{' '}
          <Text color="teal.400" as="span">
            gremlin
          </Text>
        </Text>
        <Checkbox
          colorScheme="red"
          position="fixed"
          right={4}
          onChange={() => {
            onForceError(!shouldForceError);
          }}
          checked={shouldForceError}
        >
          Show error state
        </Checkbox>
      </Flex>
      <Flex>
        <SearchForm colorScheme={colorScheme} onSubmit={onSubmit} />
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
}
