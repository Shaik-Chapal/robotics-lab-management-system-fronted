import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Image,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const LabInstrumentItemPage = () => {
  // Sample list of lab instruments
  const [labInstruments, setLabInstruments] = useState([]);
  // Sample list of suppliers
  const [suppliers] = useState([
    { id: 1, name: 'Supplier A' },
    { id: 2, name: 'Supplier B' },
    { id: 3, name: 'Supplier C' },
  ]);
  const labInstrumentList = [
    {
      id: 1,
      name: "EEE Microscope", // Updated name
      quantity: 5,
      usage: "Used to view small objects at high magnification.",
      supplier: "Acme Scientific",
    },
    {
      id: 2,
      name: "EEE Bunsen Burner", // Updated name
      quantity: 3,
      price: 20.00,
      usage: "Used for heating substances in a laboratory.",
      supplier: "BioMart",
    },
    
    {
      id: 3,
      name: "pH Meter",
      quantity: 2,
      price: 50.00,
      usage: "Used to measure the acidity or alkalinity of a substance.",
      supplier: "LabTech Solutions",
    },
    {
      id: 4,
      name: "Spectrophotometer",
      quantity: 1,
      price: 500.00,
      usage: "Used to measure the intensity of light.",
      supplier: "SciAnalytica",
    },
    
  ];
  
  // State for form input values
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [newInstrumentQuantity, setNewInstrumentQuantity] = useState("");
  const [newInstrumentPrice, setNewInstrumentPrice] = useState("");
  const [newInstrumentExpiryDate, setNewInstrumentExpiryDate] = useState("");
  const [newInstrumentUsage, setNewInstrumentUsage] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  // Function to add a new lab instrument
  const handleAddInstrument = () => {
    const newInstrument = {
      id: labInstruments.length + 1,
      name: newInstrumentName,
      quantity: newInstrumentQuantity,
      price: newInstrumentPrice,
      expiryDate: newInstrumentExpiryDate,
      usage: newInstrumentUsage,
      supplier: selectedSupplier,
    };
    setLabInstruments([...labInstruments, newInstrument]);
    // Reset form fields after adding the instrument
    resetForm();
  };

  // Function to reset form fields
  const resetForm = () => {
    setNewInstrumentName("");
    setNewInstrumentQuantity("");
    setNewInstrumentPrice("");
    setNewInstrumentExpiryDate("");
    setNewInstrumentUsage("");
    setSelectedSupplier("");
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        {/* Left side form */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Add Lab Instrument</Heading>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentName} 
              onChange={(e) => setNewInstrumentName(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Quantity</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentQuantity} 
              onChange={(e) => setNewInstrumentQuantity(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentPrice} 
              onChange={(e) => setNewInstrumentPrice(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Expiry Date</FormLabel>
            <Input 
              type="date" 
              value={newInstrumentExpiryDate} 
              onChange={(e) => setNewInstrumentExpiryDate(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>How to Use</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentUsage} 
              onChange={(e) => setNewInstrumentUsage(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Supplier</FormLabel>
            <Select
              placeholder="Select Supplier"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button colorScheme="green" onClick={handleAddInstrument}>Add Instrument</Button>
        </Box>

        {/* Right side list of lab instruments */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Lab Instruments</Heading>
          {labInstrumentList.map((instrument) => (
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
              <Text fontSize="md">Supplier: {suppliers.find(supplier => supplier.id === instrument.supplier)?.name}</Text>
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default LabInstrumentItemPage;
