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
  useToast
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";


import { BASE_URL } from "../../Redux/actionItems";

const Teacher = () => {
  const [formData, setFormData] = useState({
    Id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "" ,
    PhoneNumber: "",
    CurrentAddress: "",
    Department: "",
    Session: "",
    IdNumber: "",
    JoinDate: ""
  });
  const toast = useToast();
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
      
      const registerResponse = await fetch(`${BASE_URL}/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.Email,
          password: formData.Password,
          phone: formData.PhoneNumber,
          userRole:1 
        })
      });
  
      if (!registerResponse.ok) {
        console.error('Failed to register user');
        return;
      }
  
    
      const { userId } = await registerResponse.json();
  
    
      const newUser = {
        id: userId,
        firstName: formData.FirstName,
        lastName: formData.LastName,
        email: formData.Email,
        password: "n",
        phoneNumber: formData.PhoneNumber,
        CurrentAddress: formData.CurrentAddress,
        department: formData.Department,
        designation: formData.Department,
        Session: formData.Session,
        idNumber: formData.IdNumber,
        joinDate: formData.JoinDate
      };
      console.log(newUser)
  
      const saveUserDataResponse = await fetch(`${BASE_URL}/api/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
  
      if (saveUserDataResponse.ok) {
        console.log('User created successfully!');
        toast({
          title: "User saved successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Clear form fields
        setFormData({
          Id: "",
          FirstName: "",
          LastName: "",
          Email: "",
          Password: "" ,
          PhoneNumber: "",
          CurrentAddress: "",
          Department: "",
          Session: "",
          IdNumber: "",
          JoinDate: ""
        });
      } else {
        console.error('Failed to save user data');
        toast({
          title: "Failed to save user",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Failed to save user : "+error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box>
      <Header />

      <Flex justify="center">
        <Box w="50%" px={4}>
          <Box maxW="auto" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Create Student
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="FirstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="LastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Email" isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Department" isRequired mt={4}>
                <FormLabel>Department</FormLabel>
                <Input
                  type="text"
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="CurrentAddress" isRequired mt={4}>
                <FormLabel>Current Address</FormLabel>
                <Input
                  type="text"
                  name="CurrentAddress"
                  value={formData.CurrentAddress}
                  onChange={handleChange}
                />
              </FormControl>

            

           
            </form>
          </Box>
        </Box>

        <Box w="50%" px={4}>
          <Box maxW="auto" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Additional Information
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="PhoneNumber" isRequired mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Session" isRequired mt={4}>
                <FormLabel>Session</FormLabel>
                <Input
                  type="text"
                  name="Session"
                  value={formData.Session}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="IdNumber" isRequired mt={4}>
                <FormLabel>ID Number</FormLabel>
                <Input
                  type="text"
                  name="IdNumber"
                  value={formData.IdNumber}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="JoinDate" isRequired mt={4}>
                <FormLabel>Join Date</FormLabel>
                <Input
                  type="text"
                  name="JoinDate"
                  value={formData.JoinDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="Password" isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </FormControl>

              <Spacer />

              <Flex justify="space-between" alignItems="center">
                <Button type="submit" colorScheme="blue" mt={4}>
                  Save
                </Button>
                <Link to="/studentlist">
                  <Button colorScheme="green" mt={4}>
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

export default Teacher;
