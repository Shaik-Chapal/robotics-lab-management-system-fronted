import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const AlertsNotifications = () => {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    { id: 1, name: "Lab Instrument 1", quantity: 10, status: "normal" },
    { id: 2, name: "Lab Instrument 2", quantity: 5, status: "low" },
    { id: 3, name: "Lab Instrument 3", quantity: 8, status: "normal" },
    { id: 4, name: "Lab Instrument 4", quantity: 15, status: "damage" },
    { id: 5, name: "Lab Instrument 5", quantity: 3, status: "normal" },
  ]);

  // Filter inventory for low stock, damaged items, and borrowed items not returned
  const lowStockItems = inventory.filter(item => item.status === "low");
  const damagedItems = inventory.filter(item => item.status === "damage");
  // Assume borrowed items not returned are those with quantity = 0
  const borrowedItemsNotReturned = inventory.filter(item => item.quantity === 0);

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
                  key={item.id}
                  p={2}
                  bgColor="orange"
                  mb={2}
                >
                  <Text>{item.name} is low in stock.</Text>
                </Box>
              ))
            )}
          </Box>
          {/* Damaged items alert */}
          <Box mb={4}>
            <Heading as="h3" fontSize="xl" mb={2}>Damaged Items Alert</Heading>
            {damagedItems.length === 0 ? (
              <Text>No damaged items.</Text>
            ) : (
              damagedItems.map(item => (
                <Box 
                  key={item.id}
                  p={2}
                  bgColor="red"
                  mb={2}
                >
                  <Text>{item.name} is damaged.</Text>
                </Box>
              ))
            )}
          </Box>
          {/* Borrowed items not returned alert */}
          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>Borrowed Items Not Returned Alert</Heading>
            {borrowedItemsNotReturned.length === 0 ? (
              <Text>No borrowed items not returned.</Text>
            ) : (
              borrowedItemsNotReturned.map(item => (
                <Box 
                  key={item.id}
                  p={2}
                  bgColor="yellow"
                  mb={2}
                >
                  <Text>{item.name} has not been returned.</Text>
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
