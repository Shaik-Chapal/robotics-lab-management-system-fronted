import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Resultlist = () => {
  const [researchResults, setResearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const state = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchResearchResults = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ResearchResult`);
        if (response.ok) {
          const data = await response.json();
          setResearchResults(data);
        } else {
          throw new Error("Failed to fetch research results.");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "An error occurred while fetching research results.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchResearchResults();
  }, [toast]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/User/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        throw new Error("Failed to fetch user details.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while fetching user details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleView = async (result) => {
    setSelectedResult(result);
    await fetchUserDetails(result.userId);
    onOpen();
  };

  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4}>
          <Box mt={10}>
            <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Research Results</Heading>
            {researchResults.map((result, index) => (
              <Box 
                key={result.id} 
                p={4} 
                borderWidth="1px" 
                borderRadius="lg" 
                mb={4} 
                boxShadow="md" 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                bgColor={index % 2 === 0 ? "teal.100" : "green.100"}
                onClick={() => handleView(result)}
                cursor="pointer"
              >
             <Text flex="20%">

  {userDetails.firstName} {userDetails.lastName}
</Text>
<Text fontSize="lg" flex="80%">
  Topic: {result.topic}
</Text>

              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="teal.500" color="white">
            Research Result Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody bg="gray.100" color="black" p={8}>
            {selectedResult && (
              <>
                <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={4}>
                  {selectedResult.topic}
                </Text>
                <Text fontWeight="bold" mb={2}>Introduction:</Text>
                <Text mb={4}>{selectedResult.introduction}</Text>
                <Text fontWeight="bold" mb={2}>Abstract:</Text>
                <Text mb={4}>{selectedResult.abstract}</Text>
                <Text fontWeight="bold" mb={2}>Methodology:</Text>
                <Text mb={4}>{selectedResult.methodology}</Text>
                <Text fontWeight="bold" mb={2}>Description:</Text>
                <Text mb={4}>{selectedResult.description}</Text>
                <Text fontWeight="bold" mb={2}>Result:</Text>
                <Text mb={4}>{selectedResult.result}</Text>
                <Text fontWeight="bold" mb={2}>Conclusion:</Text>
                <Text mb={4}>{selectedResult.conclusion}</Text>
                {userDetails && (
                  <>
                    <Text fontWeight="bold" mt={4}>Researcher: {userDetails.firstName} {userDetails.lastName}</Text>
                    <Text>Email: {userDetails.email}</Text>
                    <Text>Department: {userDetails.department}</Text>
                  </>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter bg="teal.500">
            <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default Resultlist;
