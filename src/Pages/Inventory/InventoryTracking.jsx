import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const InventoryTracking = () => {

  const [inventory, setInventory] = useState([
    { id: 1, name: "Microscope", quantity: 10, description: "Used to observe very small objects." },
    { id: 2, name: "Test Tube", quantity: 5, description: "Holds and mixes liquid chemicals." },
    { id: 3, name: "Watch Glass", quantity: 8, description: "Stores solids, evaporates liquids, heats small amounts of substances." },
    { id: 4, name: "Crucible", quantity: 15, description: "Heats substances at high temperatures." },
    { id: 5, name: "Volumetric Flask", quantity: 3, description: "Holds a specific volume of liquid for accurate measurements." },
    { id: 6, name: "Beaker", quantity: 7, description: "Heats, mixes, and stores liquids." },
    { id: 7, name: "Bunsen Burner", quantity: 12, description: "Provides a heat source for experiments." },
    { id: 8, name: "Spatula", quantity: 6, description: "Scoops and transfers solid chemicals." },
    { id: 9, name: "Magnifying Glass", quantity: 9, description: "Enlarges objects for closer observation." },
    { id: 10, name: "Spring Balance", quantity: 2, description: "Measures the weight of objects." },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for sorting
  const [sortOption, setSortOption] = useState("name");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered and sorted inventory based on search query and sort option
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.quantity - b.quantity;
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
          {currentItems.map((item) => (
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              boxShadow="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="lg">{item.name}</Text>
              <Text fontSize="lg">Quantity: {item.quantity}</Text>
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
