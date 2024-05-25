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
  import { Link, Navigate } from "react-router-dom";
const Resultlist = () => {
  const [researchResults, setResearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchResearchResults = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ResearchResult`);
        if (response.ok) {
          const data = await response.json();
          setResearchResults(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch research results.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
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

  const handleView = (result) => {
    setSelectedResult(result);
    onOpen();
  };
  const state = useSelector((state) => state.authentication);
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
                <Text fontSize="lg">Topic: {result.topic}</Text>
                <Text>ID: {result.id}</Text>
                <Text>Result: {result.result}</Text>
              </Box>
            ))}
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
              <>
                <Text><strong>Topic:</strong> {selectedResult.topic}</Text>
                <Text><strong>Result:</strong> {selectedResult.result}</Text>
                <Text><strong>Description:</strong> {selectedResult.description}</Text>
              </>
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

export default Resultlist;
