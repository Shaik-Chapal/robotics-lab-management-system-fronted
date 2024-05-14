import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";

const FeaturedContent = () => {
  const [featuredContent, setFeaturedContent] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/FeaturedContent/FeaturedContents`)
      .then((response) => response.json())
      .then((data) => setFeaturedContent(data))
      .catch((error) => console.error("Error fetching featured content:", error));
  }, []);

  return (
    <Box>
      <Header />
      <Flex justify="center">
        <Box w="100%" px={4}>
          <Box
            maxW="md"
            mx="auto"
            m={10}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Featured Content
            </Text>
           
          </Box>
          {featuredContent.map((content) => (
            <Card
              key={content.contentId}
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              mb={4}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={content.thumbnailImage}
                alt='Featured Content Thumbnail'
              />
              <Stack>
                <CardBody>
                  <Heading size='md'>{content.title}</Heading>
                  <Text py='2'>{content.summary}</Text>
                </CardBody>
                
              </Stack>
            </Card>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default FeaturedContent;
