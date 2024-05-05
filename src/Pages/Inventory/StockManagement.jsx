import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const StockManagement = () => {
  // State for lab instruments list
  const [labInstruments, setLabInstruments] = useState([]);

  // Function to add a new lab instrument
  const handleAddInstrument = () => {
    const newInstrument = {
      id: labInstruments.length + 1, // Assigning unique ID
      name: "",
      quantity: 0,
      price: 0,
      expiryDate: "",
      usage: "",
      supplier: "",
    };
    setLabInstruments([...labInstruments, newInstrument]);
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        {/* Left side form for ordering */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Order Lab Instrument</Heading>
          {/* Form fields for ordering */}
          {/* Add input fields for name, quantity, price, and supplier */}
          <Button colorScheme="green" onClick={handleAddInstrument}>Order Instrument</Button>
        </Box>

        {/* Right side list of lab instruments for tracking and controlling */}
        <Box w="60%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Lab Instruments Inventory</Heading>
          {labInstruments.map((instrument) => (
            <Box 
              key={instrument.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="lg" 
              mb={4} 
              boxShadow="md" 
            >
              <Heading as="h3" fontSize="xl">{instrument.name}</Heading>
              <Text fontSize="md" mt={2}>Quantity: {instrument.quantity}</Text>
              <Text fontSize="md">Price: {instrument.price}</Text>
              <Text fontSize="md">Expiry Date: {instrument.expiryDate}</Text>
              <Text fontSize="md">How to Use: {instrument.usage}</Text>
              <Text fontSize="md">Supplier: {instrument.supplier}</Text>
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default StockManagement;
