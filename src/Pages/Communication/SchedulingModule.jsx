import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const SchedulingModule = () => {
  
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
  ]);
  const [equipment, setEquipment] = useState([
    { id: 1, name: "Equipment 1", status: "free" },
    { id: 2, name: "Equipment 2", status: "busy" },
    { id: 3, name: "Equipment 3", status: "free" },
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

  
  const handleSchedule = () => {
    // Implement scheduling logic here
    console.log(`Scheduled: Student - ${selectedStudent}, Equipment - ${selectedEquipment}, Teacher - ${selectedTeacher}, Time Slot - ${selectedTimeSlot}`);
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Scheduling Module</Heading>
          {/* Select student */}
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
            <Select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
              <option value="">Select Equipment</option>
              {equipment.map(equipment => (
                <option key={equipment.id} value={equipment.name} disabled={equipment.status === "busy"}>{equipment.name} - {equipment.status}</option>
              ))}
            </Select>
          </Box>
          {/* Select teacher */}
          <Box mb={4}>
            <Text mb={2}>Select Teacher:</Text>
            <Select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
              ))}
            </Select>
          </Box>
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
      </Flex>
      <Footer />
    </Box>
  );
}

export default SchedulingModule;
