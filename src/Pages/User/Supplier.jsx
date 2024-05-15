import React, { useState, useEffect } from "react";
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
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("https://localhost:7161/api/Suppliers");
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error("Failed to fetch suppliers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddSupplier = async () => {
    try {
      const response = await fetch("https://localhost:7161/api/Suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSupplierName,
          address: newSupplierAddress,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuppliers([...suppliers, data]);
        setNewSupplierName("");
        setNewSupplierAddress("");
      } else {
        console.error("Failed to add supplier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="60%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">
            Supplier List
          </Heading>
          {suppliers.map((supplier) => (
            <Box
              key={supplier.supplierId}
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
                <Image
                  src={supplier.imageUrl}
                  alt={supplier.name}
                  boxSize="100px"
                  mr={4}
                />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {supplier.name}
                  </Text>
                  <Text fontSize="md">Address: {supplier.address}</Text>
                </Box>
              </Flex>
              <Link to={`/supplier/${supplier.supplierId}`}>
                <Button colorScheme="blue">View Details</Button>
              </Link>
            </Box>
          ))}
        </Box>
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">
            Add Supplier
          </Heading>
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
          <Button colorScheme="green" onClick={handleAddSupplier}>
            Add Supplier
          </Button>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default Supplier;
