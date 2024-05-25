import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/User/AllTeacher`)
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  const handleActivate = (teacherId) => {
    fetch(`${BASE_URL}/api/User/ActivateTeacher/${teacherId}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        // Update the teacher's status in the state
        setTeachers(teachers.map(teacher =>
          teacher.id === teacherId ? { ...teacher, status: 'active' } : teacher
        ));
      })
      .catch(error => console.error('Error activating teacher:', error));
  };

  const handleDeactivate = (teacherId) => {
    fetch(`${BASE_URL}/api/User/DeactivateTeacher/${teacherId}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        // Remove the teacher from the list if deactivated
        setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
      })
      .catch(error => console.error('Error deactivating teacher:', error));
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue">
      <Header />

      <Flex justify="center">
        <Box w="80%" px={4}>
          <Box mt={10}>
            <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Teacher List</Heading>
            {teachers.map((teacher) => (
              <Box 
                key={teacher.id} 
                p={4} 
                borderWidth="1px" 
                borderRadius="lg" 
                mb={4} 
                boxShadow="md" 
                display="flex" 
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="lg">Name: {teacher.userName}</Text>
                <Text>ID: {teacher.uid}</Text>
                <Text>Session: {teacher.session}</Text>
                <Text>Status: {teacher.status}</Text>
                <Flex>
                  <Button 
                    colorScheme="green" 
                    onClick={() => handleActivate(teacher.id)}
                    disabled={teacher.status === 'active'}
                  >
                    Activate
                  </Button>
                  <Button 
                    colorScheme="red" 
                    onClick={() => handleDeactivate(teacher.id)}
                    disabled={teacher.status === 'inactive'}
                  >
                    Deactivate
                  </Button>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default TeacherList;
