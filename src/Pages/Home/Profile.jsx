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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [researchResults, setResearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/ResearchResult/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedResult = await response.json();
        setResearchResults((prevResults) =>
          prevResults.map((result) =>
            result.id === id ? updatedResult : result
          )
        );
        toast({
          title: "Updated",
          description: `Successfully updated research result with ID: ${id}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to update research result with ID: ${id}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update research result with ID: ${id}`,
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
                    <Text fontSize="lg" fontWeight="bold" color="teal.600">
                      {result.topic}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.introduction}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.abstract}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.methodology}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.description}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.result}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.conclusion}
                    </Text>
                    <HStack mt={2} justify="center">
                      <IconButton
                        icon={<ViewIcon />}
                        onClick={() => handleView(result)}
                        aria-label="View"
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEdit(result.id, {
                          ...result,
                          topic: "Updated Topic"
                        })}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Research Result Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedResult && (
              <VStack spacing={2} align="flex-start">
                <Text><strong>Topic:</strong> {selectedResult.topic}</Text>
                <Text><strong>Introduction:</strong> {selectedResult.introduction}</Text>
                <Text><strong>Abstract:</strong> {selectedResult.abstract}</Text>
                <Text><strong>Methodology:</strong> {selectedResult.methodology}</Text>
                <Text><strong>Description:</strong> {selectedResult.description}</Text>
                <Text><strong>Result:</strong> {selectedResult.result}</Text>
                <Text><strong>Conclusion:</strong> {selectedResult.conclusion}</Text>
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

      <Footer />
    </Box>
  );
};

export default Profile;
