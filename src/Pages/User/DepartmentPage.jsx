import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Spacer
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const DepartmentPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    currentAddress: "",
    department: "",
    session: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
  };

  return (
    <Box>
      <Header />

      <Flex justify="center">
        <Box w="50%" px={4}>
          <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Create Student
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="lastName" isRequired mt={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormControl>

              

              <FormControl id="department" isRequired mt={4}>
                <FormLabel>Department</FormLabel>
                <Input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="currentAddress" isRequired mt={4}>
                <FormLabel>Current Address</FormLabel>
                <Input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                />
              </FormControl>
            </form>
          </Box>
        </Box>

        <Box w="50%" px={4}>
          <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Additional Information
            </Text>
            <form onSubmit={handleSubmit}>
            <FormControl id="phoneNumber" isRequired mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>

              
              <FormControl id="session" isRequired>
                <FormLabel>Session</FormLabel>
                <Input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="idNumber" isRequired mt={4}>
                <FormLabel>ID Number</FormLabel>
                <Input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <Flex justify="space-between" alignItems="center" mt={6}>
                <Button type="submit" colorScheme="blue" flexGrow={1}>
                    Save
                </Button>
                <Spacer />
                <Link to={"/studentlist"}>
                <Button type="button" colorScheme="green" flexGrow={1}>
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
