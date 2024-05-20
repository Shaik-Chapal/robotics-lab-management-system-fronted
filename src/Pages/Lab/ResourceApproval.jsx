import React, { useState, useEffect } from "react";
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
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems"; // Ensure this is set to your base URL

const ResourceApproval = () => {
  const [requests, setRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [userData, setUserData] = useState({});
  const [equipmentData, setEquipmentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsResponse, equipmentResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/EquipmentLogs`),
          fetch(`${BASE_URL}/api/v1/Equipment`)
        ]);

        const logsData = await logsResponse.json();
        const equipmentData = await equipmentResponse.json();

        setRequests(logsData);
        setEquipment(equipmentData);

        // Fetch user details for each unique userId in logs
        const userIds = [...new Set(logsData.map(log => log.userId))];
        const userRequests = userIds.map(id =>
          fetch(`${BASE_URL}/api/User/${id}`).then(res => res.json())
        );

        // Fetch equipment details for each unique equipmentId in logs
        const equipmentIds = [...new Set(logsData.flatMap(log => log.items.map(item => item.equipmentId)))];
        const equipmentRequests = equipmentIds.map(id =>
          fetch(`${BASE_URL}/api/v1/Equipment/${id}`).then(res => res.json())
        );

        const users = await Promise.all(userRequests);
        const equipmentDetails = await Promise.all(equipmentRequests);

        const usersMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        const equipmentMap = equipmentDetails.reduce((acc, equip) => {
          acc[equip.equipmentID] = equip;
          return acc;
        }, {});

        setUserData(usersMap);
        setEquipmentData(equipmentMap);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/EquipmentLogs/${id}/approval`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ approval: 1 })
      });

      if (response.ok) {
        const updatedRequests = requests.map(request =>
          request.id === id ? { ...request, approval: 1 } : request
        );
        setRequests(updatedRequests);
        toast({
          title: "Approved",
          description: `Request with ID ${id} approved`,
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } else {
        throw new Error("Failed to approve request");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "Error",
        description: "Failed to approve request",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleDenial = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/EquipmentLogs/${id}/approval`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ approval: 0 })
      });

      if (response.ok) {
        const updatedRequests = requests.map(request =>
          request.id === id ? { ...request, approval: 0 } : request
        );
        setRequests(updatedRequests);
        toast({
          title: "Denied",
          description: `Request with ID ${id} denied`,
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } else {
        throw new Error("Failed to deny request");
      }
    } catch (error) {
      console.error("Error denying request:", error);
      toast({
        title: "Error",
        description: "Failed to deny request",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  const showModal = (userId) => {
    setSelectedUser(userData[userId]);
    onOpen();
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

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
                  <Td>
                    <Button variant="link" onClick={() => showModal(request.userId)}>
                      {userData[request.userId]?.firstName} {userData[request.userId]?.lastName}
                    </Button>
                  </Td>
                  <Td>
                    <ul>
                      {request.items.map(equip => (
                        <li key={equip.id}>
                          {equipmentData[equip.equipmentId]?.equipmentName} - Qty: {equip.quantity}
                        </li>
                      ))}
                    </ul>
                  </Td>
                  <Td>{request.approval === 1 ? "Approved" : "Pending"}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleApproval(request.id)}
                        disabled={request.approval !== 0}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDenial(request.id)}
                        disabled={request.approval === 0}
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
              {Object.values(equipmentData).map(equip => (
                <Tr key={equip.equipmentID}>
                  <Td>{equip.equipmentName}</Td>
                  <Td>{equip.quantity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Footer />

      {/* User Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <Box>
                <Text><strong>First Name:</strong> {selectedUser.firstName}</Text>
                <Text><strong>Last Name:</strong> {selectedUser.lastName}</Text>
                <Text><strong>Email:</strong> {selectedUser.email}</Text>
                <Text><strong>Phone Number:</strong> {selectedUser.phoneNumber}</Text>
                <Text><strong>Address:</strong> {selectedUser.currentAddress}</Text>
                <Text><strong>Department:</strong> {selectedUser.department}</Text>
                <Text><strong>Designation:</strong> {selectedUser.designation}</Text>
                <Text><strong>Session:</strong> {selectedUser.session}</Text>
                <Text><strong>ID Number:</strong> {selectedUser.idNumber}</Text>
                <Text><strong>Join Date:</strong> {selectedUser.joinDate}</Text>
                <Text><strong>End Date:</strong> {selectedUser.endDate}</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ResourceApproval;
