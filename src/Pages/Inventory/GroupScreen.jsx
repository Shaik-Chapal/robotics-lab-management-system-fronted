import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from 'axios';
import { BASE_URL } from "../../Redux/actionItems";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GroupScreen = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/GroupModel`)
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        toast({
          title: "Error fetching groups.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  const handleAddGroup = () => {
    const newGroup = {
      id: uuidv4(),
      name: newGroupName,
    };

    axios.post(`${BASE_URL}/api/GroupModel`, newGroup)
      .then(response => {
        setGroups([...groups, response.data]);
        resetForm();
        onClose();
        toast({
          title: "Group added.",
          description: `Group "${response.data.name}" added successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: "Error adding group.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleUpdateGroup = () => {
    axios.put(`${BASE_URL}/api/GroupModel/${selectedGroup.id}`, selectedGroup)
      .then(response => {
        setGroups(groups.map(group => (group.id === selectedGroup.id ? response.data : group)));
        resetForm();
        onClose();
        toast({
          title: "Group updated.",
          description: `Group "${response.data.name}" updated successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: "Error updating group.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDeleteGroup = (id) => {
    axios.delete(`${BASE_URL}/api/GroupModel/${id}`)
      .then(() => {
        setGroups(groups.filter(group => group.id !== id));
        toast({
          title: "Group deleted.",
          description: "Group deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: "Error deleting group.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const resetForm = () => {
    setNewGroupName("");
    setSelectedGroup(null);
  };

  const openEditModal = (group) => {
    setSelectedGroup(group);
    setNewGroupName(group.name);
    onOpen();
  };

  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
  <Box w="80%" px={4} mt={10}>
    <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Groups</Heading>
    <Button colorScheme="green" onClick={() => { setSelectedGroup(null); onOpen(); }}>Add Group</Button>
    <Flex direction="column" mt={8}>
      {groups.map((group) => (
        <Box 
          key={group.id} 
          p={4} 
          borderWidth="1px" 
          borderRadius="lg" 
          mb={4} 
          boxShadow="md"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h3" fontSize="xl" w="70%">{group.name}</Heading>
          <Flex w="20%" justifyContent="space-between">
            <Button colorScheme="blue" onClick={() => openEditModal(group)}>Edit</Button>
            <Button colorScheme="red" onClick={() => handleDeleteGroup(group.id)}>Delete</Button>
          </Flex>
        </Box>
      ))}
    </Flex>
  </Box>
</Flex>

      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedGroup ? "Edit Group" : "Add Group"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Group Name</FormLabel>
              <Input 
                type="text" 
                value={newGroupName} 
                onChange={(e) => setNewGroupName(e.target.value)} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={selectedGroup ? handleUpdateGroup : handleAddGroup}>
              {selectedGroup ? "Update Group" : "Add Group"}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default GroupScreen;
