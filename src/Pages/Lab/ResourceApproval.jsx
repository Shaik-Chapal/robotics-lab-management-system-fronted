import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const ResourceApproval = () => {
  // Sample data for demonstration
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      student: "Student 1", 
      equipment: [
        { id: 1, name: "Equipment 1", status: "Pending" },
        { id: 2, name: "Equipment 2", status: "Pending" }
      ],
      status: "Pending" 
    },
    { 
      id: 2, 
      student: "Student 2", 
      equipment: [
        { id: 3, name: "Equipment 3", status: "Pending" }
      ],
      status: "Pending" 
    },
    { 
      id: 3, 
      student: "Student 3", 
      equipment: [
        { id: 4, name: "Equipment 4", status: "Pending" },
        { id: 5, name: "Equipment 5", status: "Pending" },
        { id: 6, name: "Equipment 6", status: "Pending" }
      ],
      status: "Pending" 
    }
  ]);

  const handleApproval = (id) => {
    // Implement approval logic here
    console.log(`Request with ID ${id} approved`);
  };

  const handleDenial = (id) => {
    // Implement denial logic here
    console.log(`Request with ID ${id} denied`);
  };

  return (
    <Box>
      <Header />
      <Flex>
        {/* Student requests with approval buttons */}
        <Box flex="1" bg="gray.100" mr={4} p={4}>
          <Heading as="h2" mb={4} fontSize="3xl">Student Requests</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student</Th>
                <Th>Equipment</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request => (
                <Tr key={request.id}>
                  <Td>{request.student}</Td>
                  <Td>
                    <ul>
                      {request.equipment.map(equip => (
                        <li key={equip.id}>{equip.name}</li>
                      ))}
                    </ul>
                  </Td>
                  <Td>{request.status}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleApproval(request.id)}
                        disabled={request.status !== "Pending"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDenial(request.id)}
                        disabled={request.status !== "Pending"}
                        ml={2}
                      >
                        Deny
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        {/* Equipment with quantity */}
        <Box flex="1" bg="gray.200" p={4}>
          <Heading as="h2" mb={4} fontSize="3xl">Equipment</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Equipment</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request => (
                request.equipment.map(equip => (
                  <Tr key={equip.id}>
                    <Td>{equip.name}</Td>
                    <Td>1</Td> {/* Assuming quantity is always 1 for now */}
                  </Tr>
                ))
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export default ResourceApproval;
