import React, { useEffect, useState } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  Box,
  Button,
  Skeleton,
  Grid,
  GridItem,
  Text,
  Radio,
  RadioGroup,
  Input,
  HStack,
} from '@chakra-ui/react';
import { fetchPosts, deletePost } from '$reducers/postReducers';

function PostsTable() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleFilter = () => {
    setFilteredPosts(posts.filter(post => post[filterType].toLowerCase().includes(filter.toLowerCase())));
  };

  const deleteConfirmation = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este post?')) {
      handleDelete(id);
    }
  };

  const mainLoader = (
    <Skeleton
      height="400px"
      my={2}
    />
  );

  if (loading) return mainLoader;
  if (error) return mainLoader;

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Box p={4} borderWidth={1} borderRadius="md">
        <Grid templateColumns="repeat(10, 1fr)" gap={4} mt={4}>
          <GridItem colSpan={4}>
            <RadioGroup onChange={setFilterType} value={filterType}>
              <HStack spacing={3}>
                <Radio value="name">Filtro por nombre</Radio>
                <Radio value="content">Filtro por contenido</Radio>
              </HStack>
            </RadioGroup>
          </GridItem>
          <GridItem colSpan={5}>
            <Input placeholder="Filtro..." onChange={(e) => setFilter(e.target.value)} />
          </GridItem>
          <GridItem colSpan={1}>
            <Button onClick={handleFilter}>Filtrar</Button>
          </GridItem>
        </Grid>
      </Box>
      <Grid templateColumns="repeat(10, 1fr)" gap={4} mt={4}>
        <GridItem colSpan={4}>
          <Text fontSize="xl" fontWeight="bold" color="gray.500">Nombre</Text>
        </GridItem>
        <GridItem colSpan={6}>
          <Text fontSize="xl" fontWeight="bold" color="gray.500">Contenido</Text>
        </GridItem>
      </Grid>
      {filteredPosts.length !== 0 ? filteredPosts.map((post) => (
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={4}
          mt={4}
          key={post.id}
          alignItems="center"
          borderRadius="12px"
          _hover={{
            backgroundColor: 'gray.100',
            transition: 'background-color 1.0s ease',
          }}
        >
          <GridItem colSpan={4} pl="4px">
            <Text>{post.name}</Text>
          </GridItem>
          <GridItem colSpan={5}>
            <Text>{post.content}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Button mt="4px" mb="4px" colorScheme="red" onClick={() => deleteConfirmation(post.id)}>
              Eliminar
            </Button>
          </GridItem>
        </Grid>
      )) : (
        <Grid templateColumns="repeat(10, 1fr)" gap={4} mt={4}>
          <GridItem colSpan={10}>
            <Text textAlign="center" fontSize="xl">No hay posts</Text>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default PostsTable;
