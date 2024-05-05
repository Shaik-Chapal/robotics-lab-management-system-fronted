import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const MessageSystem = () => {
  // Sample data for students and teachers
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
  ]);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Teacher 1" },
    { id: 2, name: "Teacher 2" },
    { id: 3, name: "Teacher 3" },
  ]);

  // State for selected student, teacher, and message
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle sending message
  const handleMessageSend = () => {
    // Implement logic to send message here
    console.log(`Message sent from ${selectedStudent} to ${selectedTeacher}: ${message}`);
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Message System</Heading>
          {/* Select student */}
          <Box mb={4}>
            <Text mb={2}>Select Student:</Text>
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.name}>{student.name}</option>
              ))}
            </select>
          </Box>
          {/* Select teacher */}
          <Box mb={4}>
            <Text mb={2}>Select Teacher:</Text>
            <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
              ))}
            </select>
          </Box>
          {/* Message input */}
          <Box mb={4}>
            <Text mb={2}>Message:</Text>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
          </Box>
          {/* Send message button */}
          <Button colorScheme="green" onClick={handleMessageSend} disabled={!selectedStudent || !selectedTeacher || !message}>Send Message</Button>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default MessageSystem;
