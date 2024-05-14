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

const UniversityNews = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/Blog/Blogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
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
              University News
            </Text>
           
          </Box>
          {blogs.map((blog) => (
            <Card
              key={blog.blogId}
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              mb={4}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={blog.thumbnailImage}
                alt='Blog Thumbnail'
              />
              <Stack>
                <CardBody>
                  <Heading size='md'>{blog.title}</Heading>
                  <Text py='2'>{blog.content}</Text>
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

export default UniversityNews;
