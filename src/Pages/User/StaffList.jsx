import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const StaffList = () => {
  // Sample student data
  const students = [
    { id: 1, name: "Test Doe", session: "2023" },
    { id: 2, name: "John Doe", session: "2022" },
    { id: 3, name: "John Test", session: "2024" },
    { id: 4, name: "Tomi Doe", session: "2021" },
  ];

  // Sample function to handle student activation
  const handleActivate = (studentId) => {
    // Implement your logic to activate student here
    console.log(`Activate student with ID: ${studentId}`);
  };

  // Sample function to handle student deactivation
  const handleDeactivate = (studentId) => {
    // Implement your logic to deactivate student here
    console.log(`Deactivate student with ID: ${studentId}`);
  };

  return (
    <Box bgColor="lightblue">
      <Header />

      <Flex justify="center">
        <Box w="80%" px={4}>
          <Box mt={10}>
            <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Student List</Heading>
            {students.map((student) => (
              <Box 
                key={student.id} 
                p={4} 
                borderWidth="1px" 
                borderRadius="lg" 
                mb={4} 
                boxShadow="md" 
                display="flex" 
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="lg">Name: {student.name}</Text>
                <Text>ID: {student.id}</Text>
                <Text>Session: {student.session}</Text>
                <Flex>
                  <Button colorScheme="green" onClick={() => handleActivate(student.id)}>
                    Activate
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeactivate(student.id)}>
                    Deactivate
                  </Button>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default StaffList;
