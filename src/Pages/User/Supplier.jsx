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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../Redux/actionItems";

const Supplier = () => {
  const toast = useToast();
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");
  const [newSupplierContactPerson, setNewSupplierContactPerson] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Suppliers`);
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
      const response = await fetch(`${BASE_URL}/api/Suppliers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSupplierName,
          address: newSupplierAddress,
          contactPerson: newSupplierContactPerson,
          email: newSupplierEmail,
          phone: newSupplierPhone,
        }),
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Crtment created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        const data = await response.json();
        setSuppliers([...suppliers, data]);
        setNewSupplierName("");
        setNewSupplierAddress("");
        setNewSupplierContactPerson("");
        setNewSupplierEmail("");
        setNewSupplierPhone("");
      } else {
        toast({
          title: "Error",
          description: "Failed to create  or duplicate .",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create  or duplicate .",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateSupplier = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Suppliers/${currentSupplier.supplierId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierId:currentSupplier.supplierId,
          name: currentSupplier.name,
          address: currentSupplier.address,
          contactPerson: currentSupplier.contactPerson,
          email: currentSupplier.email,
          phone: currentSupplier.phone,
        }),
      });
      if (response.ok) {
        fetchSuppliers();
        onClose();
      } else {
        console.error("Failed to update supplier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Suppliers/${supplierId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== supplierId));
      } else {
        console.error("Failed to delete supplier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

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
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {supplier.name}
                  </Text>
                  <Text fontSize="md">Contact Person: {supplier.contactPerson}</Text>
                  <Text fontSize="md">Email: {supplier.email}</Text>
                  <Text fontSize="md">Phone: {supplier.phone}</Text>
                  <Text fontSize="md">Address: {supplier.address}</Text>
                </Box>
              </Flex>
              <Button colorScheme="blue" onClick={() => {
                setCurrentSupplier(supplier);
                onOpen();
              }}>Update</Button>
              <Button colorScheme="red" onClick={() => handleDeleteSupplier(supplier.supplierId)}>Delete</Button>
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
          <FormControl mb={4}>
            <FormLabel>Contact Person</FormLabel>
            <Input
              type="text"
              value={newSupplierContactPerson}
              onChange={(e) => setNewSupplierContactPerson(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={newSupplierEmail}
              onChange={(e) => setNewSupplierEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              value={newSupplierPhone}
              onChange={(e) => setNewSupplierPhone(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleAddSupplier}>
            Add Supplier
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Supplier</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={currentSupplier?.name || ""}
                onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Contact Person</FormLabel>
              <Input
                type="text"
                value={currentSupplier?.contactPerson || ""}
                onChange={(e) => setCurrentSupplier({ ...currentSupplier, contactPerson: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={currentSupplier?.email || ""}
                onChange={(e) => setCurrentSupplier({ ...currentSupplier, email: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                value={currentSupplier?.phone || ""}
                onChange={(e) => setCurrentSupplier({ ...currentSupplier, phone: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={currentSupplier?.address || ""}
                onChange={(e) => setCurrentSupplier({ ...currentSupplier, address: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSupplier}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default Supplier;
