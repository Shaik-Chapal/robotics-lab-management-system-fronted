import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { BASE_URL } from "../../Redux/actionItems";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Branch`);
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Branch/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Deleted",
          description: "Department deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchDepartments();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete department",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDepartment(null);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Branch/${currentDepartment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentDepartment),
      });
      if (response.ok) {
        toast({
          title: "Updated",
          description: "Department updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchDepartments();
        handleModalClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to update department",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Header />
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Department List</Text>
      {departments.map((department) => (
        <Box
          key={department.id}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          mb={4}
          boxShadow="md"
        >
          <Stack direction="row" align="center" justify="space-between" mb={2}>
            <Text fontWeight="bold">{department.name}</Text>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="blue" onClick={() => handleUpdate(department)}>Update</Button>
              <Button colorScheme="red" onClick={() => handleDelete(department.id)}>Delete</Button>
            </Stack>
          </Stack>
          <Text>{department.address}</Text>
          <Text>{department.phone}</Text>
        </Box>
      ))}
      <Footer />
      {currentDepartment && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Department</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={currentDepartment.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={currentDepartment.address}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={currentDepartment.phone}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
                Update
              </Button>
              <Button variant="ghost" onClick={handleModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DepartmentList;
