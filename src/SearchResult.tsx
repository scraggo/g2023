import * as React from 'react';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';

import { Result } from './types';

type Props = {
  colorMode: string;
  isMatch: boolean;
  result: Result;
};

const bottomTextMargin = 3;

export default function SearchResult({ colorMode, isMatch, result }: Props) {
  const { package: pkg } = result;
  const {
    author,
    date,
    description,
    keywords,
    links,
    name,
    publisher,
    version,
  } = pkg;
  const { npm } = links;
  const { username } = publisher;

  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      pb={2}
      mb={2}
    >
      <Box mb={bottomTextMargin}>
        <Link fontSize="xl" fontWeight="bold" href={npm}>
          {name}
        </Link>
        {isMatch ? (
          <Text
            as="span"
            p={1}
            ml={6}
            bgColor={colorMode === 'light' ? 'purple.50' : 'purple.800'}
          >
            exact match
          </Text>
        ) : null}
      </Box>
      <Text mb={bottomTextMargin}>{description}</Text>
      {keywords && keywords.length > 0 ? (
        <Box mb={bottomTextMargin}>
          {keywords.map((keyword, idx) => (
            <Text
              as="span"
              key={idx}
              p={1}
              mr={1}
              mb={bottomTextMargin}
              bgColor={colorMode === 'light' ? 'gray.50' : 'gray.600'}
            >
              {keyword}
            </Text>
          ))}
          <br />
        </Box>
      ) : null}
      {author ? (
        <Flex my={1} alignItems="center">
          <Icon as={FaUserCircle} />
          <Link
            fontWeight="bold"
            href={`https://www.npmjs.com/~${username}`}
            mx={1}
          >
            {author.name}
          </Link>
          <Text as="span">
            published {version} • {date.split('T')[0]}
          </Text>
        </Flex>
      ) : null}
    </Box>
  );
}
