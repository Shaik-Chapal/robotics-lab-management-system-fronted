import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [researchResults, setResearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Box w="100%" px={4}>
          <Box
            maxW="md"
            mx="auto"
            m={10}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Text fontWeight={400} fontSize={"30px"} mb={0} textAlign="center">
              My Research Results
            </Text>
            {loading ? (
              <Spinner />
            ) : (
              <VStack spacing={4} mt={4}>
                {researchResults.map((result) => (
                  <Box
                    key={result.id}
                    p={4}
                    w="100%"
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {result.topic}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.result}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {result.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default Profile;
