import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  useToast,
  VStack,
  Flex,
} from '@chakra-ui/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from 'axios';
import { BASE_URL } from "../../Redux/actionItems";

const EquipmentManagementScreen = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/Equipment`)
      .then(response => {
        setEquipmentList(response.data);
      })
      .catch(error => {
        toast({
          title: "Error fetching equipment.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  // Define colors array
  const colors = ['#FFA07A', '#EE82EE', '#2E8B57'];

  return (
    <Box p={4}>
      <Header />

      <Heading as="h2" mb={4} color="white">Equipment Details</Heading>

      <VStack spacing={4}>
        {equipmentList.map((equipment, index) => (
          <Box 
            key={equipment.equipmentID} 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            w="100%" 
            bgColor={colors[index % colors.length]} // Alternate colors
            color="white" // Set text color to white
          >
            <Text fontWeight="bold" fontSize="lg">{equipment.equipmentName}</Text>
            <Flex justifyContent="space-between">
              <Text>Quantity: {equipment.quantity}</Text>
              <Text>Location: {equipment.location}</Text>
            </Flex>
            <Text mt={2} fontStyle="italic">How to Use: {equipment.description}</Text>
          </Box>
        ))}
      </VStack>

      <Footer />
    </Box>
  );
};

export default EquipmentManagementScreen;
