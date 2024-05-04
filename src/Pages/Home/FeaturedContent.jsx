import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const FeaturedContentList = [
  {
    id: 1,
    heading: "Groundbreaking Research Reveals New Insights!",
    body: "A recent study conducted by researchers at our university has uncovered groundbreaking insights into.A recent study conducted by researchers at our university has uncovered groundbreaking insights into.A recent study conducted by researchers at our university has uncovered groundbreaking insights into.A recent study conducted by researchers at our university has uncovered groundbreaking insights into...",
    imagLink: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    heading: "Exciting new research project announced!",
    body: "A team of researchers at the university has begun work on a groundbreaking project aimed at.A team of researchers at the university has begun work on a groundbreaking project aimed at.A team of researchers at the university has begun work on a groundbreaking project aimed at.A team of researchers at the university has begun work on a groundbreaking project aimed at.A team of researchers at the university has begun work on a groundbreaking project aimed at...",
    imagLink: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    heading: "University applications now open!",
    body: "Applications for the next academic year are now being accepted. Apply today to join our vibrant.Applications for the next academic year are now being accepted. Apply today to join our vibrant.Applications for the next academic year are now being accepted. Apply today to join our vibrant.Applications for the next academic year are now being accepted. Apply today to join our vibrant.Applications for the next academic year are now being accepted. Apply today to join our vibrant.Applications for the next academic year are now being accepted. Apply today to join our vibrant...",
    imagLink: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];
const FeaturedContent = () => {
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
            FeaturedContent
            </Text>
           
          </Box>
          {FeaturedContentList.map((news) => (
              <Card
                key={news.id}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                mb={4}
              >
                <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '200px' }}
                  src={news.imagLink}
                  alt='News Image'
                />
                <Stack>
                  <CardBody>
                    <Heading size='md'>{news.heading}</Heading>
                    <Text py='2'>
                      {news.body}
                    </Text>
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
