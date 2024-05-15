import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { BASE_URL } from "../../Redux/actionItems";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/User/Department`);
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

  const handleUpdate = (id) => {
    console.log("Update department with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete department with ID:", id);
  };

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
              <Button colorScheme="blue" onClick={() => handleUpdate(department.id)}>Update</Button>
              <Button colorScheme="red" onClick={() => handleDelete(department.id)}>Delete</Button>
            </Stack>
          </Stack>
          <Text>{department.address}</Text>
          <Text>{department.phone}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default DepartmentList;
