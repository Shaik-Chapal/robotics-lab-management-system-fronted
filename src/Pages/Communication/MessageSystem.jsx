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
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const MessageSystem = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const userId = localStorage.getItem("userId");
  const [connection, setConnection] = useState(null);

  const state = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!state.isAuth) {
      return <Navigate to="/login" />;
    }

    // Fetch users (teachers)
    axios
      .get(`${BASE_URL}/api/Chats/GetUsers`)
      .then((response) => {
        // Filter out the current user
        const otherUsers = response.data.filter(user => user.id !== userId);
        setTeachers(otherUsers);
        // Set users object for quick lookup by id
        const usersObj = response.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersObj);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers!", error);
      });

    // Set up SignalR connection
    const connect = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/chat-hub`)
      .configureLogging(LogLevel.Information)
      .build();

    connect.start()
      .then(() => {
        console.log("Connected to the chat hub");
        setConnection(connect);
        connect.invoke("Connect", userId);

        connect.on("Messages", (newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        connect.on("Users", (user) => {
          setUsers((prevUsers) => ({ ...prevUsers, [user.id]: user }));
        });
      })
      .catch((error) => console.error("Error connecting to the chat hub", error));

    return () => {
      if (connect) {
        connect.stop();
      }
    };
  }, [userId, state.isAuth]);

  useEffect(() => {
    if (selectedTeacher) {
      // Fetch chats with selected teacher
      axios
        .get(`${BASE_URL}/api/Chats/GetChats`, {
          params: {
            userId: userId,
            toUserId: selectedTeacher,
          },
        })
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the messages!", error);
        });
    }
  }, [selectedTeacher, userId]);

  const handleMessageSend = () => {
    if (!selectedTeacher || !message) {
      return;
    }

    const newMessage = {
      userId: userId,
      toUserId: selectedTeacher,
      message: message,
      date: new Date().toISOString() // Adding the current date and time
    };

    axios
      .post(`${BASE_URL}/api/Chats/SendMessage`, newMessage)
      .then((response) => {
        // Assuming the response data is the new message object returned from the server
        setMessages((prevMessages) => [...prevMessages, response.data]);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
        // Optionally, you can still add the message locally even if the API call fails
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .finally(() => {
        setMessage(""); // Clear the message input after sending, regardless of success or failure
      });
  };

  const filteredMessages = messages.filter(
    (msg) => msg.userId === selectedTeacher || msg.toUserId === selectedTeacher
  );
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
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
                    <Avatar name={`${teacher.firstName} ${teacher.lastName}`} />
                    <Text>{`${teacher.firstName} ${teacher.lastName}`}</Text>
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
                    <Avatar name={`${users[selectedTeacher]?.firstName} ${users[selectedTeacher]?.lastName}`} />
                    <Box>
                      <Heading as="h3" size="lg">{`${users[selectedTeacher]?.firstName} ${users[selectedTeacher]?.lastName}`}</Heading>
                      <Text fontSize="sm">Last seen at {new Date().toLocaleTimeString()}</Text>
                    </Box>
                  </HStack>
                  <HStack spacing={2}>
                    <IconButton icon={<PhoneIcon />} />
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
                        bg={msg.userId === userId ? "blue.100" : "green.100"}
                        alignSelf={msg.userId === userId ? "flex-end" : "flex-start"}
                      >
                        <Text>{msg.message}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {new Date(msg.date).toLocaleString()}
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
