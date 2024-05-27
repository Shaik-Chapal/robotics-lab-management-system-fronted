import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spacer, useToast } from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";
import UpdateModal from "./UpdateModal";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const University = () => {
  const [universityData, setUniversityData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const fetchUniversityData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/University`);
      if (response.ok) {
        const data = await response.json();
        setUniversityData(data);
      } else {
        
      }
    } catch (error) {
     
    }
  };

  useEffect(() => {
    fetchUniversityData();
  }, []);

  const handleUpdateData = (updatedData) => {
    setUniversityData(updatedData);
    fetchUniversityData();
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
          >
            <Text fontWeight={400} fontSize={"30px"} mb={0} textAlign="center">
              University
            </Text>
          </Box>
        </Box>
      </Flex>

      {universityData && (
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
                {universityData.name}
              </Text>
              <Text fontSize="md" color="gray.600">
                {universityData.email}
              </Text>
              <Text fontSize="md" color="gray.600">
                {universityData.phone}
              </Text>
              <Text fontSize="md" color="gray.600">
                {universityData.address}
              </Text>
              <Text fontSize="md" color="gray.600">
                Open Time: {universityData.openTime}, Close Time: {universityData.closeTime}
              </Text>
              <Text fontSize="md" color="gray.600">
                <a href={universityData.website}>{universityData.website}</a>
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
            p={0}
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Flex justify="center">
              <Button colorScheme="blue" w="full" h="50px" onClick={() => setIsModalOpen(true)}>
                Update
              </Button>
            </Flex>

            {universityData && (
              <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdateData}
                universityData={universityData}
              />
            )}
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default University;
