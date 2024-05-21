import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Textarea,
  VStack,
  Input,
  Avatar,
  Stack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon, AttachmentIcon, PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../Redux/actionItems";

const MessageSystem = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    // Fetch teachers
    axios
      .get("https://localhost:7161/api/User/AllUser")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers!", error);
      });

    // Fetch all messages (both sent and received)
    const fetchMessages = async () => {
      try {
        const [received, sent] = await Promise.all([
          axios.get(`https://localhost:7161/api/Messages/received/${userId}`),
          axios.get(`https://localhost:7161/api/Messages/sent/${userId}`)
        ]);

        const allMessages = [...received.data, ...sent.data];
        const userIds = [
          ...new Set(allMessages.map((msg) => msg.senderId).concat(allMessages.map((msg) => msg.receiverId))),
        ];
        const userDetailPromises = userIds.map((id) => axios.get(`https://localhost:7161/api/User/${id}`));
        const userDetails = await Promise.all(userDetailPromises);

        const users = userDetails.reduce((acc, res) => {
          acc[res.data.id] = res.data;
          return acc;
        }, {});

        setUsers(users);
        setMessages(allMessages);
      } catch (error) {
        console.error("There was an error fetching the messages or user details!", error);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleMessageSend = () => {
    if (!selectedTeacher || !message) {
      return;
    }

    const newMessage = {
      senderId: userId,
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

  const filteredMessages = messages.filter(
    (msg) => msg.senderId === selectedTeacher || msg.receiverId === selectedTeacher
  );

  return (
    <Box bgColor="lightblue" minHeight="100vh">
      <Header />
      <Flex justify="center" p={4}>
        <Flex w="90%" direction={{ base: "column", md: "row" }} mt={10} boxShadow="lg" borderRadius="md" bg="white">
          {/* Sidebar: List of Chats */}
          <Box w={{ base: "100%", md: "30%" }} p={4} borderRight="1px solid #e0e0e0">
            <Flex mb={4} align="center">
              <Input placeholder="Search here..." variant="filled" mr={2} />
              <IconButton icon={<SearchIcon />} />
            </Flex>
            <VStack spacing={4} align="stretch">
              {teachers.map((teacher) => (
                <Box
                  key={teacher.id}
                  p={3}
                  borderRadius="md"
                  bg={selectedTeacher === teacher.id ? "teal.100" : "gray.100"}
                  cursor="pointer"
                  onClick={() => setSelectedTeacher(teacher.id)}
                >
                  <HStack>
                    <Avatar name={teacher.userName} />
                    <Text>{teacher.userName}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Main Chat Area */}
          <Box w={{ base: "100%", md: "70%" }} p={4} display="flex" flexDirection="column">
            {selectedTeacher && (
              <>
                <Flex mb={4} justify="space-between" align="center">
                  <HStack>
                    <Avatar name={users[selectedTeacher]?.userName} />
                    <Box>
                      <Heading as="h3" size="lg">{users[selectedTeacher]?.userName}</Heading>
                      <Text fontSize="sm">Last seen at {new Date().toLocaleTimeString()}</Text>
                    </Box>
                  </HStack>
                  <HStack spacing={2}>
                    <IconButton icon={<PhoneIcon />} />
                    =
                    <IconButton icon={<InfoIcon />} />
                  </HStack>
                </Flex>
                <Box mb={4} flex="1" overflowY="scroll">
                  <VStack spacing={4} align="stretch">
                    {filteredMessages.map((msg) => (
                      <Box
                        key={msg.id}
                        p={3}
                        borderRadius="md"
                        bg={msg.senderId === userId ? "blue.100" : "green.100"}
                        alignSelf={msg.senderId === userId ? "flex-end" : "flex-start"}
                      >
                        <Text>{msg.content}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {new Date(msg.sentAt).toLocaleString()}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
                <Flex mt={4} align="center">
                  <IconButton icon={<AttachmentIcon />} mr={2} />
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                    flex="1"
                    resize="none"
                  />
                  <Button
                    colorScheme="teal"
                    onClick={handleMessageSend}
                    disabled={!selectedTeacher || !message}
                  >
                    Send
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default MessageSystem;