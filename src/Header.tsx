import * as React from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchInput from './SearchInput';

type Props = {
  onSubmit: (searchText: string) => void;
};

export default function Header({ onSubmit }: Props) {
  const [inputText, setInputText] = React.useState('');

  return (
    <Flex as="header">
      <SearchInput
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setInputText(event.currentTarget.value)
        }
        onSubmit={() => onSubmit(inputText)}
        value={inputText}
      />
      <Button onClick={() => onSubmit(inputText)} colorScheme="blackAlpha">
        Search
      </Button>
      <ColorModeSwitcher />
    </Flex>
  );
}
