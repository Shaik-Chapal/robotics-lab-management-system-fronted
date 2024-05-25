import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Select,Grid, GridItem 
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
const EquipmentRequestSystem = () => {
  
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
  ]);
  const [equipment, setEquipment] = useState([
    { id: 1, name: "Equipment 1", status: "available" },
    { id: 2, name: "Equipment 2", status: "available"},
    { id: 3, name: "Equipment 3", status: "available" },
  ]);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Teacher 1" },
    { id: 2, name: "Teacher 2" },
    { id: 3, name: "Teacher 3" },
  ]);
  const [timeSlots, setTimeSlots] = useState([
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "1:00 PM - 3:00 PM",
  ]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  const handleAddToCart = () => {
    if (selectedEquipment) {
      const equipmentToAdd = equipment.find(e => e.name === selectedEquipment);
      setSelectedEquipmentList([...selectedEquipmentList, equipmentToAdd]);
    }
  };

  const handleRemoveFromCart = (equipmentToRemove) => {
    const updatedList = selectedEquipmentList.filter(equipment => equipment.name !== equipmentToRemove.name);
    setSelectedEquipmentList(updatedList);
  };

  const handleSchedule = () => {
    // Implement scheduling logic here
    console.log(`Scheduled: Student - ${selectedStudent}, Equipment - ${selectedEquipment}, Teacher - ${selectedTeacher}, Time Slot - ${selectedTimeSlot}`);
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Equipment Request System</Heading>
          {/* Select student */}
          {/* <Grid templateColumns='repeat(2, 1fr)' gap={6}>
  <GridItem w='100%' h='10' bg='blue.900' />
  <GridItem w='100%' h='10' bg='blue.500' />
  
</Grid> */}
          <Box mb={4}>
            <Text mb={2}>Select Student:</Text>
            <Select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.name}>{student.name}</option>
              ))}
            </Select>
          </Box>
          {/* Select equipment */}
          <Box mb={4}>
            <Text mb={2}>Select Equipment:</Text>
            <Flex>
              <Select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
                <option value="">Select Equipment</option>
                {equipment.map(equipment => (
                  <option key={equipment.id} value={equipment.name} disabled={equipment.status === "busy"}>{equipment.name} - {equipment.status}</option>
                ))}
              </Select>
              <Button ml={2} colorScheme="blue" onClick={handleAddToCart}>Add to Cart</Button>
            </Flex>
          </Box>
          {/* Select teacher */}
         
          {/* Select time slot */}
          <Box mb={4}>
            <Text mb={2}>Select Time Slot:</Text>
            <Select value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
              <option value="">Select Time Slot</option>
              {timeSlots.map(timeSlot => (
                <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
              ))}
            </Select>
          </Box>
          {/* Schedule button */}
          <Button colorScheme="green" onClick={handleSchedule} disabled={!selectedStudent || !selectedEquipment || !selectedTeacher || !selectedTimeSlot}>Schedule</Button>
        </Box>
        {/* Selected equipment list */}
        <Box w="20%" px={4} mt={10}>
          <Heading as="h3" mb={4} fontSize="xl">Selected Equipment</Heading>
          {selectedEquipmentList.map(equipment => (
            <Flex key={equipment.id} justify="space-between" mb={2}>
              <Text>{equipment.name}</Text>
              <Button size="xs" colorScheme="red" onClick={() => handleRemoveFromCart(equipment)}>Remove</Button>
            </Flex>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default EquipmentRequestSystem;
