import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Heading,
  Image,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Holiday = () => {
  const holidays = [
    {
      id: 1,
      name: 'Christmas',
      date: 'December 25th',
      description: 'Celebration of the birth of Jesus Christ.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'New Year',
      date: 'January 1st',
      description: 'Marks the beginning of a new year.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
   
    },
  ];

  const handleActivate = (studentId) => {
    console.log(`Activate student with ID: ${studentId}`);
    // Implement your logic to activate student here
  };

  const handleDeactivate = (studentId) => {
    console.log(`Deactivate student with ID: ${studentId}`);
    // Implement your logic to deactivate student here
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightgreen">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Holiday List</Heading>
          {holidays.map((holiday) => (
            <Box 
              key={holiday.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="lg" 
              mb={4} 
              boxShadow="md" 
              display="flex" 
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Image src={holiday.image} alt={holiday.name} boxSize="100px" mr={4} />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">{holiday.name}</Text>
                  <Text fontSize="md">Date: {holiday.date}</Text>
                  <Text fontSize="md">{holiday.description}</Text>
                </Box>
              </Flex>
             
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default Holiday;
