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

const ResultSharing = () => {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");
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
      result,
      description,
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
        const data = await response.json();
        toast({
          title: "Success",
          description: "Research result uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear the form fields
        setTopic("");
        setResult("");
        setDescription("");
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

  return (
    <Box bgColor="white">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">
            Upload Research Findings
          </Heading>
          {/* Topic */}
          <Box mb={4}>
            <Text mb={2}>Topic:</Text>
            <Input
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Box>
          {/* Result */}
          <Box mb={4}>
            <Text mb={2}>Result:</Text>
            <Input
              placeholder="Enter result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </Box>
          {/* Description */}
          <Box mb={4}>
            <Text mb={2}>Description:</Text>
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="sm"
            />
          </Box>
          {/* Upload button */}
          <Button
            colorScheme="green"
            onClick={handleUpload}
            disabled={!topic || !result || !description}
          >
            Upload
          </Button>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default ResultSharing;
