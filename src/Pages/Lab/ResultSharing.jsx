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

const ResultSharing = () => {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = () => {
    // Implement upload logic here
    console.log(`Uploaded: Topic - ${topic}, Result - ${result}, Description - ${description}`);
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
