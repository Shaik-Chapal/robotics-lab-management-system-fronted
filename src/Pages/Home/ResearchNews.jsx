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
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
const ResearchNews = () => {
  const [researchData, setResearchData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/Research/Research`)
      .then((response) => response.json())
      .then((data) => setResearchData(data))
      .catch((error) => console.error("Error fetching research data:", error));
  }, []);
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
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
              Research News
            </Text>
           
          </Box>
          {researchData.map((research) => (
            <Card
              key={research.researchId}
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              mb={4}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={research.thumbnailImage}
                alt='Research Thumbnail'
              />
              <Stack>
                <CardBody>
                  <Heading size='md'>{research.title}</Heading>
                  <Text py='2'>{research.summary}</Text>
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

export default ResearchNews;
