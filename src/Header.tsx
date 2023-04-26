import * as React from 'react';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchInput from './SearchInput';

type Props = {
  onSubmit: (searchText: string) => void;
};

export default function Header({ onSubmit }: Props) {
  const [inputText, setInputText] = React.useState('');
  const colorScheme = useColorModeValue('blackAlpha', 'gray');

  return (
    <Flex as="header">
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
  );
}
