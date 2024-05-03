import { Grid, GridItem, Box, Text,Button
    ,
   Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Section1 = () => {
  
  const newsData = [
    { id: 1, title: "News 1", summary: "Summary of News 1", link: "/news/1" },
    { id: 2, title: "News 2", summary: "Summary of News 2", link: "/news/2" },
  
  ];

  const researchData = [
    { id: 1, title: "Research 1", summary: "Summary of Research 1", link: "/research/1" },
    { id: 2, title: "Research 2", summary: "Summary of Research 2", link: "/research/2" },
   
  ];

  const featuredData = [
    { id: 1, title: "Featured Content 1", summary: "Summary of Featured Content 1", link: "/featured/1" },
    { id: 2, title: "Featured Content 2", summary: "Summary of Featured Content 2", link: "/featured/2" },
   
  ];

  return (
    <Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
    >
      <GridItem colSpan={3} bg='papayawhip'>
      
        <Box p={4}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>University News</Text>
          {newsData.map((item) => (
            <Box key={item.id} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.summary}</Text>
              <ChakraLink as={Link} to={item.link} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>
      <GridItem colSpan={2} bg='papayawhip'>
       
        <Box p={4}>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
  <GridItem w='100%' h='10' bg='blue.500' >


  <Text fontWeight="bold" fontSize="lg" mb={2}>Latest Research</Text>
  </GridItem>
  
  <GridItem w="100%" h="10" bg="blue.500">
  <Button colorScheme="cyan" justifySelf="left">
    See All
  </Button>
</GridItem>

</Grid>
          
        
          {researchData.map((item) => (
            <Box key={item.id} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.summary}</Text>
              <ChakraLink as={Link} to={item.link} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>
      <GridItem colSpan={5} bg='tomato'>
       
        <Box p={4}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>Featured Content</Text>
          {featuredData.map((item) => (
            <Box key={item.id} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.summary}</Text>
              <ChakraLink as={Link} to={item.link} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Section1;
