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
  // Sample inventory data
  const [inventory, setInventory] = useState([
    { id: 1, name: "Lab Instrument 1", quantity: 10 },
    { id: 2, name: "Lab Instrument 2", quantity: 5 },
    { id: 3, name: "Lab Instrument 3", quantity: 8 },
    { id: 4, name: "Lab Instrument 4", quantity: 15 },
    { id: 5, name: "Lab Instrument 5", quantity: 3 },
    { id: 6, name: "Lab Instrument 6", quantity: 7 },
    { id: 7, name: "Lab Instrument 7", quantity: 12 },
    { id: 8, name: "Lab Instrument 8", quantity: 6 },
    { id: 9, name: "Lab Instrument 9", quantity: 9 },
    { id: 10, name: "Lab Instrument 10", quantity: 2 },
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
