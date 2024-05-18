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
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from 'axios';
import { BASE_URL } from "../../Redux/actionItems";
import { v4 as uuidv4 } from 'uuid';

const GroupScreen = () => {
  // State for form input values
  const [newGroupName, setNewGroupName] = useState("");

  // State for groups
  const [groups, setGroups] = useState([]);

  // Fetch groups on component mount
  useEffect(() => {
    axios.get(`${BASE_URL}/api/GroupModel`)
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the groups!', error);
      });
  }, []);

  // Function to add a new group
  const handleAddGroup = () => {
    const newGroup = {
      id: uuidv4(),
      name: newGroupName,
    };

    axios.post(`${BASE_URL}/api/GroupModel`, newGroup)
      .then(response => {
        setGroups([...groups, response.data]);
        resetForm();
      })
      .catch(error => {
        console.error('There was an error adding the group!', error);
      });
  };

  // Function to reset form fields
  const resetForm = () => {
    setNewGroupName("");
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        {/* Left side form */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Add Group</Heading>
          <FormControl mb={4}>
            <FormLabel>Group Name</FormLabel>
            <Input 
              type="text" 
              value={newGroupName} 
              onChange={(e) => setNewGroupName(e.target.value)} 
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleAddGroup}>Add Group</Button>
        </Box>

        {/* Right side list of groups */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Groups</Heading>
          {groups.map((group) => (
            <Box 
              key={group.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="lg" 
              mb={4} 
              boxShadow="md" 
            >
              <Heading as="h3" fontSize="xl">{group.name}</Heading>
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default GroupScreen;
