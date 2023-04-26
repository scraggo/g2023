// import * as React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type Props = {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
};

export default function SearchInput({ onChange, onSubmit, value }: Props) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSubmit();
          }
        }}
      />
    </InputGroup>
  );
}
