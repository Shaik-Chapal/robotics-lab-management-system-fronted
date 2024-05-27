import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { BASE_URL } from "../../Redux/actionItems";

const AlertsNotifications = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/EquipmentLogs/equipment-status`);
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  // Filter inventory for low stock, damaged items, and borrowed items not returned
  const lowStockItems = inventory.filter(item => item.status === "Low Stock");
  const damagedItems = inventory.filter(item => item.status === "Damaged");
  // Assume borrowed items not returned are those with quantity = 0
  const borrowedItemsNotReturned = inventory.filter(item => item.equipmentToTal === 0);
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Alerts & Notifications</Heading>

          {/* Low stock alert */}
          <Box mb={4}>
            <Heading as="h3" fontSize="xl" mb={2}>Low Stock Alert</Heading>
            {lowStockItems.length === 0 ? (
              <Text>No items with low stock.</Text>
            ) : (
              lowStockItems.map(item => (
                <Box 
                  key={item.equipmentID}
                  p={2}
                  bgColor="orange.200"
                  mb={2}
                  borderRadius="md"
                >
                  <Text>{item.equipmentName} is low in stock.</Text>
                </Box>
              ))
            )}
          </Box>


        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default AlertsNotifications;
