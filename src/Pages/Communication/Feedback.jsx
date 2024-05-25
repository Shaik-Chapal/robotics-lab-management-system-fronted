import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Textarea,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Feedback = () => {
  // State for feedback message
  const [feedback, setFeedback] = useState("");

  // Function to handle sending feedback
  const handleFeedbackSubmit = () => {
    // Implement logic to submit feedback here
    console.log(`Feedback submitted: ${feedback}`);
    // Reset feedback input after submission
    setFeedback("");
  };
  const state = useSelector((state) => state.authentication);

  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Feedback</Heading>
          {/* Feedback input */}
          <Box mb={4}>
            <Text mb={2}>Your Feedback:</Text>
            <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={6} />
          </Box>
          {/* Submit feedback button */}
          <Button colorScheme="green" onClick={handleFeedbackSubmit} disabled={!feedback}>Submit Feedback</Button>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default Feedback;
