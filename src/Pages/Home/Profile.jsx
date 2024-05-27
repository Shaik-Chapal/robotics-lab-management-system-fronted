import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Spinner,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [researchResults, setResearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editData, setEditData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/User/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchResearchResults = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ResearchResult/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setResearchResults(data);
        } else {
          console.error("Failed to fetch research results");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
      fetchResearchResults();
    }
  }, []);

  const handleView = (result) => {
    setSelectedResult(result);
    onOpen();
  };

  const handleEditClick = (result) => {
    setEditData(result);
    onEditOpen();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/ResearchResult/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        toast({
          title: "Updated",
          description: `Successfully updated research`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onEditClose();
        window.location.reload(); // Refresh the page
      }
       else {
        toast({
          title: "Error",
          description: `Failed to update research result`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update research result with ID: ${editData.id}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/ResearchResult/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setResearchResults(researchResults.filter((result) => result.id !== id));
        toast({
          title: "Deleted",
          description: `Successfully deleted research result with ID: ${id}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to delete research result with ID: ${id}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete research result with ID: ${id}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Header />
      <Flex justify="center">
        <Box w="100%" px={4}>
          <Box
            maxW="md"
            mx="auto"
            m={10}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg="teal.50"
          >
            <Text fontWeight={400} fontSize={"30px"} mb={0} textAlign="center">
              Profile
            </Text>
          </Box>
        </Box>
      </Flex>
      {userData && (
        <Flex justify="center">
          <Box w="100%" px={4}>
            <Box
              maxW="md"
              mx="auto"
              m={10}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              bg="teal.100"
            >
              <Text fontSize="lg" fontWeight="bold" mt={0}>
                {userData.firstName} {userData.lastName}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.email}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.phoneNumber}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.currentAddress}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.department}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.designation}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.idNumber}
              </Text>
              <Text fontSize="md" color="gray.600">
                {userData.session}
              </Text>
            </Box>
          </Box>
        </Flex>
      )}
      <Flex justify="center">
        <Box w="100%" px={1}>
          <Box
            w="95%"
            mx="auto"
            m={10}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
          >
            <Text fontWeight={400} fontSize={"30px"} mb={0} textAlign="center">
              My Research Results
            </Text>
            {loading ? (
              <Flex justify="center" mt={4}>
                <Spinner />
              </Flex>
            ) : (
              <HStack spacing={4} mt={4} overflowX="auto">
                {researchResults.map((result) => (
                  <Box
                    key={result.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    boxShadow="md"
                    minWidth="300px"
                  >

<Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={4}>
                  {result.topic}
                </Text>
                <Text fontWeight="bold" mb={2}>Introduction:</Text>
                <Text mb={4}>{result.introduction}</Text>
                <Text fontWeight="bold" mb={2}>Abstract:</Text>
                <Text mb={4}>{result.abstract}</Text>
                <Text fontWeight="bold" mb={2}>Methodology:</Text>
                <Text mb={4}>{result.methodology}</Text>
                <Text fontWeight="bold" mb={2}>Description:</Text>
                <Text mb={4}>{result.description}</Text>
                <Text fontWeight="bold" mb={2}>Result:</Text>
                <Text mb={4}>{result.result}</Text>
                <Text fontWeight="bold" mb={2}>Conclusion:</Text>
                <Text mb={4}>{result.conclusion}</Text>
                   
                    <HStack mt={2} justify="center">
                      <IconButton
                        icon={<ViewIcon />}
                        onClick={() => handleView(result)}
                        aria-label="View"
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEditClick(result)}
                        aria-label="Edit"
                        colorScheme="yellow"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(result.id)}
                        aria-label="Delete"
                        colorScheme="red"
                      />
                    </HStack>
                  </Box>
                ))}
              </HStack>
            )}
          </Box>
        </Box>
      </Flex>

      {/* View Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Research Result Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedResult && (
              <VStack spacing={2} align="flex-start">
                <Text>
                  <strong>Topic:</strong> {selectedResult.topic}
                </Text>
                <Text>
                  <strong>Introduction:</strong> {selectedResult.introduction}
                </Text>
                <Text>
                  <strong>Abstract:</strong> {selectedResult.abstract}
                </Text>
                <Text>
                  <strong>Methodology:</strong> {selectedResult.methodology}
                </Text>
                <Text>
                  <strong>Description:</strong> {selectedResult.description}
                </Text>
                <Text>
                  <strong>Result:</strong> {selectedResult.result}
                </Text>
                <Text>
                  <strong>Conclusion:</strong> {selectedResult.conclusion}
                </Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Research Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editData && (
              <form onSubmit={handleEditSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Topic</FormLabel>
                    <Input
                      name="topic"
                      value={editData.topic}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Introduction</FormLabel>
                    <Textarea
                      name="introduction"
                      value={editData.introduction}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Abstract</FormLabel>
                    <Textarea
                      name="abstract"
                      value={editData.abstract}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Methodology</FormLabel>
                    <Textarea
                      name="methodology"
                      value={editData.methodology}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Result</FormLabel>
                    <Textarea
                      name="result"
                      value={editData.result}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Conclusion</FormLabel>
                    <Textarea
                      name="conclusion"
                      value={editData.conclusion}
                      onChange={handleEditChange}
                    />
                  </FormControl>
                </VStack>
                <Button mt={4} colorScheme="blue" type="submit">
                  Save
                </Button>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default Profile;
