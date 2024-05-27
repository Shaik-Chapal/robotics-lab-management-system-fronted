import React, { useState, useEffect } from "react";
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
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { BASE_URL } from "../../Redux/actionItems";

const Teacher = () => {
  const [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  const onSubmit = async (data) => {
    try {
      const registerResponse = await fetch(`${BASE_URL}/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.Email,
          password: data.Password,
          phone: data.PhoneNumber,
          userRole: 2,
        }),
      });

      if (!registerResponse.ok) {
        throw new Error("Failed to register user");
      }

      const { userId } = await registerResponse.json();

      const newUser = {
        id: userId,
        firstName: data.FirstName,
        lastName: data.LastName,
        email: data.Email,
        password: "n",
        phoneNumber: data.PhoneNumber,
        currentAddress: data.CurrentAddress,
        department: data.Department,
        designation: data.Department,
        session: "",
        idNumber: data.IdNumber,
        joinDate: data.JoinDate,
        status: "active",
      };

      const saveUserDataResponse = await fetch(`${BASE_URL}/api/User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!saveUserDataResponse.ok) {
        throw new Error("Failed to save user data");
      }

      toast({
        title: "User saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: `Failed to save user: ${error.message}`,
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
              Create Teacher
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="FirstName" isInvalid={errors.FirstName} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  {...register("FirstName", {
                    required: "First Name is required",
                  })}
                />
                <FormErrorMessage>{errors.FirstName && errors.FirstName.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="LastName" isInvalid={errors.LastName} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  {...register("LastName", {
                    required: "Last Name is required",
                  })}
                />
                <FormErrorMessage>{errors.LastName && errors.LastName.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="Email" isInvalid={errors.Email} isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <FormErrorMessage>{errors.Email && errors.Email.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="Department" isInvalid={errors.Department} isRequired mt={4}>
                <FormLabel>Department</FormLabel>
                <Select
                  placeholder="Select department"
                  {...register("Department", {
                    required: "Department is required",
                  })}
                >
                  {departments.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.Department && errors.Department.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="CurrentAddress" isInvalid={errors.CurrentAddress} isRequired mt={4}>
                <FormLabel>Current Address</FormLabel>
                <Input
                  type="text"
                  {...register("CurrentAddress", {
                    required: "Current Address is required",
                  })}
                />
                <FormErrorMessage>{errors.CurrentAddress && errors.CurrentAddress.message}</FormErrorMessage>
              </FormControl>
            </form>
          </Box>
        </Box>

        <Box w="50%" px={4}>
          <Box maxW="auto" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
            <Text fontWeight={400} fontSize={"30px"} mb={5} textAlign="center">
              Additional Information
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="PhoneNumber" isInvalid={errors.PhoneNumber} isRequired mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  {...register("PhoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                <FormErrorMessage>{errors.PhoneNumber && errors.PhoneNumber.message}</FormErrorMessage>
              </FormControl>

              

              <FormControl id="IdNumber" isInvalid={errors.IdNumber} isRequired mt={4}>
                <FormLabel>ID Number</FormLabel>
                <Input
                  type="text"
                  {...register("IdNumber", {
                    required: "ID Number is required",
                  })}
                />
                <FormErrorMessage>{errors.IdNumber && errors.IdNumber.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="JoinDate" isInvalid={errors.JoinDate} isRequired mt={4}>
                <FormLabel>Join Date</FormLabel>
                <Input
                  type="datetime-local"
                  {...register("JoinDate", {
                    required: "Join Date is required",
                  })}
                />
                <FormErrorMessage>{errors.JoinDate && errors.JoinDate.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="Password" isInvalid={errors.Password} isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("Password", {
                    required: "Password is required",
                  })}
                />
                <FormErrorMessage>{errors.Password && errors.Password.message}</FormErrorMessage>
              </FormControl>

              <Spacer />

              <Flex justify="space-between" alignItems="center">
                <Button type="submit" colorScheme="blue" mt={4}>
                  Save
                </Button>
                <Link to="/teacherList">
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
