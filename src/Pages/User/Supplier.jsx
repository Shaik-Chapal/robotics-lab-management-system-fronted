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
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Supplier A',
      address: '123 Main St',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Supplier B',
      address: '456 Elm St',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Supplier C',
      address: '789 Oak St',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ]);

  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");

  const handleAddSupplier = () => {
    const newSupplier = {
      id: suppliers.length + 1,
      name: newSupplierName,
      address: newSupplierAddress,
      imageUrl: 'https://via.placeholder.com/150',
    };
    setSuppliers([...suppliers, newSupplier]);
    setNewSupplierName("");
    setNewSupplierAddress("");
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="60%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Supplier List</Heading>
          {suppliers.map((supplier) => (
            <Box 
              key={supplier.id} 
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
                <Image src={supplier.imageUrl} alt={supplier.name} boxSize="100px" mr={4} />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">{supplier.name}</Text>
                  <Text fontSize="md">Address: {supplier.address}</Text>
                </Box>
              </Flex>
              <Link to={`/supplier/${supplier.id}`}>
                <Button colorScheme="blue">View Details</Button>
              </Link>
            </Box>
          ))}
        </Box>
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Add Supplier</Heading>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              value={newSupplierName} 
              onChange={(e) => setNewSupplierName(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input 
              type="text" 
              value={newSupplierAddress} 
              onChange={(e) => setNewSupplierAddress(e.target.value)} 
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleAddSupplier}>Add Supplier</Button>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default Supplier;
