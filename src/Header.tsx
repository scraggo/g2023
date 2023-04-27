import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchInput from './SearchInput';

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
  const [inputText, setInputText] = React.useState('');
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
          onChange={() => onForceError(!shouldForceError)}
          checked={shouldForceError}
        >
          Show error state
        </Checkbox>
      </Flex>
      <Flex>
        <SearchInput
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setInputText(event.currentTarget.value)
          }
          onSubmit={() => onSubmit(inputText)}
          value={inputText}
        />
        <Button onClick={() => onSubmit(inputText)} colorScheme={colorScheme}>
          Search
        </Button>
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
}
