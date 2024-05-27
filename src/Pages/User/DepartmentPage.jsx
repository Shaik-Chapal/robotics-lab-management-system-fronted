import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { BASE_URL } from "../../Redux/actionItems"; // Import BASE_URL
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const DepartmentPage = () => {
  const universityId = localStorage.getItem("universityId");
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    companyId: universityId, // Include companyId in the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/Branch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        toast({
          title: "Success",
          description: "Department created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          name: "",
          address: "",
          phone: "",
         
        });
      } else {
        // Handle failure
        toast({
          title: "Error",
          description: "Failed to create Department",
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

  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Header />

      <Flex justify="center">
        <Box w="50%" px={4}>
          <Box maxW="auto" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Create Department
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="name" isRequired>
                <FormLabel>Department Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="address" isRequired mt={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="phone" isRequired mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>

              <Flex justify="space-between" alignItems="center" mt={6}>
                <Button type="submit" colorScheme="blue" style={{ width: "calc(50% - 4px)" }}>
                  Save
                </Button>
                <Spacer />
                <Link to={"/departmentList"} style={{ width: "calc(50% - 4px)" }}>
                  <Button type="button" colorScheme="green" style={{ width: "100%" }}>
                    List 
                  </Button>
                </Link>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default DepartmentPage;
