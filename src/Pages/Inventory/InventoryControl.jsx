import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const InventoryControl = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Robot Arm", quantity: 5, lowStock: 2 },
    { id: 2, name: "3D Printer", quantity: 1, lowStock: 1 },
    { id: 3, name: "Battery Pack", quantity: 10, lowStock: 5 },
  ]);

  const handleInventoryChange = (id, newQuantity) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Box>
      <Header/>
      <Flex justify="center">
        <Box w="100%" px={4}>
          <Box  bg="blue.500" 
            maxW="md"
            mx="auto"
            m={10}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Text
              fontWeight={400}
              fontSize={"30px"}
              mb={5}
              textAlign="center"
            >
              Inventory Control
            </Text>
          </Box>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Low Stock Level</Th>
<Th pl="10px">Actions</Th>

              </Tr>
            </Thead>
            <Tbody>
              {inventory.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td isNumeric>{item.lowStock}</Td>
                  <Td>
                  <Button
  size="sm"
  colorScheme="green"
  onClick={() =>
    handleInventoryChange(item.id, item.quantity + 1)
  }
  mr={10} // Add margin-right for spacing
>
  Add
</Button>
<Button
  size="sm"
  colorScheme="red"
  onClick={() =>
    handleInventoryChange(
      item.id,
      Math.max(item.quantity - 1, 0)
    )
  }
>
  Remove
</Button>

                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default InventoryControl;
