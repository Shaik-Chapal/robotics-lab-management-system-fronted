import React, { useState, useEffect } from "react";
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
  useToast
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from 'axios';
import { BASE_URL } from "../../Redux/actionItems";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PurchaseOrder = () => {
  const toast = useToast();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");
  const [price, setPrice] = useState(0);
  const [equipmentId, setEquipmentId] = useState("");
  const [company, setCompany] = useState("");
  const [origin, setOrigin] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [createDate, setCreateDate] = useState("");

  const [equipmentOptions, setEquipmentOptions] = useState({});
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/Equipment`)
      .then(response => {
        const options = response.data.reduce((acc, equipment) => {
          acc[equipment.equipmentName] = equipment.equipmentID;
          return acc;
        }, {});
        setEquipmentOptions(options);
      })
      .catch(error => {
        console.error('There was an error fetching the equipment options!', error);
      });

    axios.get(`${BASE_URL}/api/Suppliers`)
      .then(response => {
        setSupplierOptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the supplier options!', error);
      });

    axios.get(`${BASE_URL}/api/v1/PurchaseOrder`)
      .then(response => {
        setPurchaseOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the purchase orders!', error);
      });
  }, []);

  const validateFields = () => {
    if (!itemName) {
      toast({
        title: "Validation Error",
        description: "Item Name is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!quantity || quantity <= 0) {
      toast({
        title: "Validation Error",
        description: "Quantity should be greater than 0.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!expirationDate) {
      toast({
        title: "Validation Error",
        description: "Expiration Date is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!price || price <= 0) {
      toast({
        title: "Validation Error",
        description: "Price should be greater than 0.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!equipmentId) {
      toast({
        title: "Validation Error",
        description: "Equipment ID is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!company) {
      toast({
        title: "Validation Error",
        description: "Company is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!origin) {
      toast({
        title: "Validation Error",
        description: "Origin is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!manufacturer) {
      toast({
        title: "Validation Error",
        description: "Manufacturer is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!modelNumber) {
      toast({
        title: "Validation Error",
        description: "Model Number is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!createDate) {
      toast({
        title: "Validation Error",
        description: "Create Date is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    const newPurchaseOrder = {
      itemName,
      quantity: Number(quantity), // Ensure quantity is a number
      expirationDate,
      price: Number(price), // Ensure price is a number
      equipmentId,
      company,
      origin,
      manufacturer,
      modelNumber,
      createDate
    };

    console.log("New Purchase Order Payload:", newPurchaseOrder);

    axios.post(`${BASE_URL}/api/v1/PurchaseOrder`, newPurchaseOrder)
      .then(response => {
        console.log('PurchaseOrder created successfully:', response.data);
        setPurchaseOrders([...purchaseOrders, response.data]);
        toast({
          title: "Purchase Order Added",
          description: "The purchase order has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetForm();
      })
      .catch(error => {
        toast({
          title: "Error",
          description: "An error occurred while adding the purchase order.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error('There was an error creating the purchase order!', error);
      });
  };

  const resetForm = () => {
    setItemName("");
    setQuantity(0);
    setExpirationDate("");
    setPrice(0);
    setEquipmentId("");
    setCompany("");
    setOrigin("");
    setManufacturer("");
    setModelNumber("");
    setCreateDate("");
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Header />
      <Flex justify="center">
        <Box w="50%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={4} fontSize="3xl">Add Purchase Order</Heading>
          <FormControl mb={4}>
            <FormLabel>Item Name</FormLabel>
            <Select
              placeholder="Select Item Name"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                setEquipmentId(equipmentOptions[e.target.value]);
              }}
            >
              {Object.keys(equipmentOptions).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Quantity</FormLabel>
            <Input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Create Date</FormLabel>
            <Input 
              type="date" 
              value={createDate} 
              onChange={(e) => setCreateDate(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Expiration Date</FormLabel>
            <Input 
              type="date" 
              value={expirationDate} 
              onChange={(e) => setExpirationDate(e.target.value)} 
            />
          </FormControl>
         
          <FormControl mb={4}>
            <FormLabel>Company</FormLabel>
            <Select
              placeholder="Select Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {supplierOptions.map(option => (
                <option key={option.supplierId} value={option.name}>{option.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Origin</FormLabel>
            <Input 
              type="text" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Manufacturer</FormLabel>
            <Input 
              type="text" 
              value={manufacturer} 
              onChange={(e) => setManufacturer(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Model Number</FormLabel>
            <Input 
              type="text" 
              value={modelNumber} 
              onChange={(e) => setModelNumber(e.target.value)} 
            />
          </FormControl>
          
          <Button colorScheme="green" onClick={handleSubmit}>Add Purchase Order</Button>
        </Box>

        <Box w="50%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={4} fontSize="3xl">Purchase Orders</Heading>
          {purchaseOrders.map(order => (
            <Box key={order.purchaseOrderId} p={4} borderWidth="1px" borderRadius="lg" mb={4} boxShadow="md">
              <Text><strong>Item Name:</strong> {order.itemName}</Text>
              <Text><strong>Quantity:</strong> {order.quantity}</Text>
              <Text><strong>Expiration Date:</strong> {order.expirationDate}</Text>
              <Text><strong>Price:</strong> ${order.price}</Text>
              <Text><strong>Company:</strong> {order.company}</Text>
              <Text><strong>Origin:</strong> {order.origin}</Text>
              <Text><strong>Manufacturer:</strong> {order.manufacturer}</Text>
              <Text><strong>Model Number:</strong> {order.modelNumber}</Text>
              <Text><strong>Create Date:</strong> {order.createDate}</Text>
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default PurchaseOrder;
