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


const Profile = () => {
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
            <Text fontWeight={400} fontSize={"30px"} mb={0} textAlign="center">
            Profile
            </Text>
           
          </Box>
         
        </Box>
      </Flex>
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
          <Text fontSize="lg" fontWeight="bold" mt={0}>
                  John Doe
                </Text>
                <Text fontSize="md" color="gray.600">
                  john.doe@example.com
                </Text>
           
          </Box>
         
        </Box>
      </Flex>
  
      <Footer />
    </Box>
  );
};

export default Profile;
