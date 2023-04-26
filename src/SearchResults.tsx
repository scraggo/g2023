// import * as React from 'react';

import { useNPMSearch } from './hooks';

type Props = {
  searchText: string;
};

const Wrapper = ({ children }: { children?: any }) => <main>{children}</main>;

export default function SearchResults({ searchText }: Props) {
  const { data, error, isLoading } = useNPMSearch(searchText);

  if (isLoading) {
    return <Wrapper>loading</Wrapper>;
  }

  if (error) {
    console.error(error);
    return <Wrapper>error - see console</Wrapper>;
  }

  return (
    <Wrapper>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Wrapper>
  );
}
