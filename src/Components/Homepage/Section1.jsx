import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, Text, Button, Flex, Spacer, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Redux/actionItems";

const Section1 = () => {
  const [newsData, setNewsData] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    // Fetch data for University News
    fetch(`${BASE_URL}/api/Blog/TopTwoBlogs`)
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error("Error fetching University News:", error));

    // Fetch data for Latest Research
    fetch(`${BASE_URL}/api/Research/TopTwoResearchs`)
      .then((response) => response.json())
      .then((data) => setResearchData(data))
      .catch((error) => console.error("Error fetching Latest Research:", error));

    // Fetch data for Featured Content
    fetch(`${BASE_URL}/api/FeaturedContent/TopTwoFeaturedContents`)
      .then((response) => response.json())
      .then((data) => setFeaturedData(data))
      .catch((error) => console.error("Error fetching Featured Content:", error));
  }, []);

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={3} bg="papayawhip">
        <Box p={4}>
          <Flex>
            <Box bg="red.200">
              <Text fontWeight="bold" fontSize="lg" p={2}>University News</Text>
            </Box>
            <Spacer />
            <Box>
              <Button colorScheme="red">
                <Link to="/universitynews">See All</Link>
              </Button>
            </Box>
          </Flex>

          {newsData.map((item) => (
            <Box key={item.blogId} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.content}</Text>
              <ChakraLink as={Link} to={`/blog/${item.blogId}`} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>

      <GridItem colSpan={2} bg="papayawhip">
        <Box p={4}>
          <Flex>
            <Box bg="red.200">
              <Text fontWeight="bold" fontSize="lg" p={2}>Latest Research</Text>
            </Box>
            <Spacer />
            <Box>
              <Button colorScheme="red">
                <Link to="/researchnews">See All</Link>
              </Button>
            </Box>
          </Flex>

          {researchData.map((item) => (
            <Box key={item.researchId} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.summary}</Text>
              <ChakraLink as={Link} to={`/research/${item.researchId}`} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>

      <GridItem colSpan={5} bg="tomato">
        <Box p={4}>
          <Flex>
            <Box bg="blue.100">
              <Text fontWeight="bold" fontSize="lg" p={2}>Featured Content</Text>
            </Box>
            <Spacer />
            <Box>
              <Button colorScheme="cyan">
                <Link to="/featurecontent">See All</Link>
              </Button>
            </Box>
          </Flex>

          {featuredData.map((item) => (
            <Box key={item.contentId} mb={4}>
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.summary}</Text>
              <ChakraLink as={Link} to={item.fullContentLink} fontWeight="bold" color="blue.500">Read more</ChakraLink>
            </Box>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Section1;
