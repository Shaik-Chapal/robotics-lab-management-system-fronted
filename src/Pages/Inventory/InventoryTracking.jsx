import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Heading, Button, Input, Select } from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";

import { BASE_URL } from "../../Redux/actionItems"; // Ensure this contains the base URL of your API
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
const InventoryTracking = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/EquipmentLogs/equipment-summary`);
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  // The rest of the component code remains the same
  // Filtered and sorted inventory based on search query and sort option
  const filteredInventory = inventory.filter(item =>
    item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortOption === "name") {
      return a.equipmentName.localeCompare(b.equipmentName);
    } else {
      return a.equipmentToTal - b.equipmentToTal;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">Inventory Tracking</Heading>
    <Box mb={4}>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        mb={2}
      />
      <Select
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="name">Sort by Name</option>
        <option value="quantity">Sort by Quantity</option>
      </Select>
    </Box>

    {/* Table Header */}
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      mb={4}
      boxShadow="md"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="blue.900" 
    >
      <Text fontSize="lg" w="25%" color="white">Name</Text>
  <Text fontSize="lg" w="15%" color="white">Quantity</Text>
  <Text fontSize="lg" w="15%" color="white">Booked</Text>
  <Text fontSize="lg" w="15%" color="white">Used</Text>
  <Text fontSize="lg" w="15%" color="white">Returned</Text>
  <Text fontSize="lg" w="15%" color="white">Damaged</Text>
    </Box>

    {/* Inventory Items */}
    {currentItems.map((item) => (
      <Box
        key={item.equipmentID}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        mb={4}
        boxShadow="md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="lg" w="25%">{item.equipmentName}</Text>
        <Text fontSize="lg" w="15%">{item.equipmentTotal}</Text>
        <Text fontSize="lg" w="15%">{item.bookedCount}</Text>
        <Text fontSize="lg" w="15%">{item.usedCount}</Text>
        <Text fontSize="lg" w="15%">{item.returnedCount}</Text>
        <Text fontSize="lg" w="15%">{item.damagedCount}</Text>
      </Box>
    ))}

    {/* Pagination */}
    <Flex justify="center">
      {Array.from({ length: Math.ceil(filteredInventory.length / itemsPerPage) }).map((_, index) => (
        <Button
          key={index}
          colorScheme={currentPage === index + 1 ? "green" : "gray"}
          onClick={() => handlePageChange(index + 1)}
          mr={2}
        >
          {index + 1}
        </Button>
      ))}
    </Flex>
  </Box>
</Flex>

      <Footer />
    </Box>
  );
}

export default InventoryTracking;
