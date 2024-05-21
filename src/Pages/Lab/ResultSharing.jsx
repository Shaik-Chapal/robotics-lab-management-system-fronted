import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Textarea,
  useToast
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { BASE_URL } from "../../Redux/actionItems";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const ResultSharing = () => {
  const [topic, setTopic] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [abstract, setAbstract] = useState("");
  const [methodology, setMethodology] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [conclusion, setConclusion] = useState("");
  const toast = useToast();

  const handleUpload = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID is missing. Please log in again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const requestBody = {
      topic,
      introduction,
      abstract,
      methodology,
      description,
      result,
      conclusion,
      userId
    };

    try {
      const response = await fetch(`${BASE_URL}/api/ResearchResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Research result uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear the form fields
        setTopic("");
        setIntroduction("");
        setAbstract("");
        setMethodology("");
        setDescription("");
        setResult("");
        setConclusion("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.title || "Failed to upload research result.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while uploading research result.",
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
    <Box bgColor="white">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">
            Upload Research Findings
          </Heading>
          <Box mb={4}>
            <Text mb={2}>Topic:</Text>
            <Input
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Introduction:</Text>
            <Input
              placeholder="Enter introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Abstract:</Text>
            <Input
              placeholder="Enter abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Methodology:</Text>
            <Input
              placeholder="Enter methodology"
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Description:</Text>
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="sm"
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Result:</Text>
            <Input
              placeholder="Enter result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Conclusion:</Text>
            <Input
              placeholder="Enter conclusion"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
            />
          </Box>
          <Flex justify="space-between" alignItems="center">
            <Button
              colorScheme="green"
              onClick={handleUpload}
              disabled={!topic || !introduction || !abstract || !methodology || !description || !result || !conclusion}
            >
              Upload
            </Button>
            <Link to="/resultlist">
              <Button colorScheme="green" mt={4}>
                List
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default ResultSharing;
