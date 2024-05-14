import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";

const Profile = () => {
  const [userData, setUserData] = useState(null);

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

    if (userId) {
      fetchUserData();
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
      <Footer />
    </Box>
  );
};

export default Profile;
