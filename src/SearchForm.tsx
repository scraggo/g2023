import * as React from 'react';
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type Props = {
  colorScheme: string;
  onSubmit: (inputText: string) => void;
};

export default function SearchForm({ colorScheme, onSubmit }: Props) {
  const [inputText, setInputText] = React.useState('');

  return (
    <FormControl display="flex" id="npm-search-form">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          data-testid="search-input"
          type="text"
          value={inputText}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setInputText(e.currentTarget.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSubmit(inputText);
            }
          }}
        />
      </InputGroup>
      <Button
        type="submit"
        onClick={() => {
          onSubmit(inputText);
        }}
        colorScheme={colorScheme}
      >
        Search
      </Button>
    </FormControl>
  );
}
