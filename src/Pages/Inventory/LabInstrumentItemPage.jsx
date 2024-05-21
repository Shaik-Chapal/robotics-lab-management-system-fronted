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
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LabInstrumentItemPage = () => {
  // State for form input values
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [newInstrumentQuantity, setNewInstrumentQuantity] = useState("");
  const [newInstrumentUsage, setNewInstrumentUsage] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // State for suppliers, groups, and lab instruments
  const [suppliers, setSuppliers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [labInstruments, setLabInstruments] = useState([]);

  // Fetch suppliers, groups, and lab instruments on component mount
  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/Equipment`)
      .then(response => {
        setLabInstruments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the lab instruments!', error);
      });

    axios.get(`${BASE_URL}/api/GroupModel`)
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the groups!', error);
      });
  }, []);

  // Function to add a new lab instrument
  const handleAddInstrument = () => {
    const newInstrument = {
      equipmentID: uuidv4(),
      equipmentName: newInstrumentName,
      description: newInstrumentUsage,

      location: newInstrumentQuantity,
      groupID: selectedGroup,


    };

    axios.post(`${BASE_URL}/api/v1/Equipment`, newInstrument)
      .then(response => {
        setLabInstruments([...labInstruments, response.data]);
        resetForm();
      })
      .catch(error => {
        console.error('There was an error adding the instrument!', error);
      });
  };

  // Function to reset form fields
  const resetForm = () => {
    setNewInstrumentName("");
    setNewInstrumentQuantity("");
    setNewInstrumentUsage("");
    setSelectedSupplier("");
    setSelectedGroup("");
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        {/* Left side form */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Add Lab Instrument</Heading>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentName} 
              onChange={(e) => setNewInstrumentName(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Group</FormLabel>
            <Select
              placeholder="Select Group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map(group => (
                <option key={group.name} value={group.name}>{group.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentQuantity} 
              onChange={(e) => setNewInstrumentQuantity(e.target.value)} 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>How to Use</FormLabel>
            <Input 
              type="text" 
              value={newInstrumentUsage} 
              onChange={(e) => setNewInstrumentUsage(e.target.value)} 
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleAddInstrument}>Add Instrument</Button>
        </Box>

        {/* Right side list of lab instruments */}
        <Box w="40%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Lab Instruments</Heading>
          {labInstruments.map((instrument) => (
            <Box 
              key={instrument.equipmentID} 
              p={4} 
              borderWidth="1px" 
              borderRadius="lg" 
              mb={4} 
              boxShadow="md" 
            >
              <Heading as="h3" fontSize="xl">{instrument.equipmentName}</Heading>
              <Text fontSize="md" mt={2}>Location: {instrument.location}</Text>
              <Text fontSize="md">How to Use: {instrument.description}</Text>
              <Text fontSize="md">Supplier: {instrument.company}</Text>
              <Text fontSize="md">Group: {groups.find(group => group.id === instrument.groupID)?.name}</Text>
            </Box>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default LabInstrumentItemPage;
