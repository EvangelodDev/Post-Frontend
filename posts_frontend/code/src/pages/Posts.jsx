import React, { useMemo } from 'react';
import {
  Box,
  VStack,
  Text,
} from '@chakra-ui/react';
import PostTable from '$tables/PostTable';
import PostForm from '$forms/PostForm';

function Posts() {
  const memoizedTable = useMemo(() => <PostTable />, []);

  return (
    <Box
      w="100%"
      h="100%"
      p="4rem"
    >
      <Text
        fontSize="2xl"
        fontWeight={600}
        textAlign="center"
      >
        Posts
      </Text>
      <VStack
        spacing="2rem"
        align="stretch"
      >
        {memoizedTable}
        <PostForm />
      </VStack>
    </Box>
  );
}

export default Posts;
