import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems"; // Ensure this contains the base URL of your API
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const InventoryControl = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/Equipment/grouped-equipment`);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups data:", error);
      }
    };

    fetchGroups();
  }, []);

  // Define an array of colors for different background colors
  const colors = ["orange.200", "blue.200", "green.200", "purple.200", "red.200"];
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Inventory Control</Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {groups.map((group, index) => (
              <Box
                key={group.id}
                p={4}
                bgColor={colors[index % colors.length]} // Cycle through colors
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="lg"><strong></strong> {group.name}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default InventoryControl;
