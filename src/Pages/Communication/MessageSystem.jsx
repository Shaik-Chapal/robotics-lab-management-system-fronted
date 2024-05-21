import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Textarea,
  Select,
  VStack,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const MessageSystem = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const studentId = "17FA016F-AE8B-4044-80E3-ABD54DFE392F"; // Replace with the actual student ID

  useEffect(() => {
    // Fetch teachers
    axios
      .get("https://localhost:7161/api/User/AllTeacher")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers!", error);
      });

    // Fetch user details
    const fetchUserDetails = (id) => {
      return axios.get(`https://localhost:7161/api/User/${id}`);
    };

    // Fetch received messages
    axios
      .get(`https://localhost:7161/api/Messages/received/${studentId}`)
      .then((response) => {
        const messages = response.data;
        const userIds = [
          ...new Set(messages.map((msg) => msg.senderId).concat(messages.map((msg) => msg.receiverId))),
        ];
        const userDetailPromises = userIds.map((id) => fetchUserDetails(id));
        Promise.all(userDetailPromises)
          .then((responses) => {
            const users = responses.reduce((acc, res) => {
              acc[res.data.id] = res.data;
              return acc;
            }, {});
            setUsers(users);
            setMessages(messages);
          })
          .catch((error) => {
            console.error("There was an error fetching the user details!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error fetching the received messages!", error);
      });

    // Fetch sent messages
    axios
      .get(`https://localhost:7161/api/Messages/sent/${studentId}`)
      .then((response) => {
        const messages = response.data;
        const userIds = [
          ...new Set(messages.map((msg) => msg.senderId).concat(messages.map((msg) => msg.receiverId))),
        ];
        const userDetailPromises = userIds.map((id) => fetchUserDetails(id));
        Promise.all(userDetailPromises)
          .then((responses) => {
            const users = responses.reduce((acc, res) => {
              acc[res.data.id] = res.data;
              return acc;
            }, {});
            setUsers(users);
            setMessages((prevMessages) => [...prevMessages, ...messages]);
          })
          .catch((error) => {
            console.error("There was an error fetching the user details!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error fetching the sent messages!", error);
      });
  }, [studentId]);

  const handleMessageSend = () => {
    if (!selectedTeacher || !message) {
      return;
    }

    const newMessage = {
      senderId: studentId,
      receiverId: selectedTeacher,
      content: message,
    };

    axios
      .post("https://localhost:7161/api/Messages/send", newMessage)
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setMessage(""); // Clear the message input after sending
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
      });
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue" minHeight="100vh">
      <Header />
      <Flex justify="center" p={4}>
        <Flex w="80%" direction={{ base: "column", md: "row" }} mt={10}>
          {/* Left part: Sent/Received Messages */}
          <Box w={{ base: "100%", md: "30%" }} p={4} bg="white" borderRadius="md" mr={{ md: 4 }} mb={{ base: 4, md: 0 }}>
            <Heading as="h3" size="lg" mb={4} textAlign="center">
              Messages
            </Heading>
            {messages.length === 0 ? (
              <Text>No messages available.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {messages.map((msg) => (
                  <Box key={msg.id} p={3} borderRadius="md" bg={msg.senderId === studentId ? "blue.100" : "green.100"}>
                    <Text>
                      <b>{msg.senderId === studentId ? "To" : "From"}:</b> {msg.senderId === studentId ? `${users[msg.receiverId]?.firstName} ${users[msg.receiverId]?.lastName}` : `${users[msg.senderId]?.firstName} ${users[msg.senderId]?.lastName}`}
                    </Text>
                    <Text>{msg.content}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(msg.sentAt).toLocaleString()}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          {/* Right part: Send Message */}
          <Box w={{ base: "100%", md: "70%" }} p={4} bg="white" borderRadius="md">
            <Heading as="h3" size="lg" mb={4} textAlign="center">
              Send a Message
            </Heading>
            {/* Select teacher */}
            <Box mb={4}>
              <Text mb={2}>Select Teacher:</Text>
              <Select
                placeholder="Select Teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.userName}
                  </option>
                ))}
              </Select>
            </Box>
            {/* Message input */}
            <Box mb={4}>
              <Text mb={2}>Message:</Text>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </Box>
            {/* Send message button */}
            <Button
              colorScheme="green"
              onClick={handleMessageSend}
              disabled={!selectedTeacher || !message}
            >
              Send Message
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default MessageSystem;
