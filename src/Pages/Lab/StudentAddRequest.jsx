import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Select,
  useToast
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BASE_URL } from "../../Redux/actionItems";

const StudentAddRequest = () => {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const toast = useToast();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const equipmentResponse = await fetch(`${BASE_URL}/api/v1/Equipment`);
      const equipmentData = await equipmentResponse.json();
      setEquipment(equipmentData);
    };

    fetchData();
  }, []);

  const handleAddToCart = () => {
    if (selectedEquipment && quantity > 0) {
      const equipmentToAdd = equipment.find(
        (e) => e.equipmentName === selectedEquipment
      );
      setSelectedEquipmentList([
        ...selectedEquipmentList,
        { ...equipmentToAdd, quantity },
      ]);
      setSelectedEquipment(""); // Reset selected equipment
      setQuantity(1); // Reset quantity
    }
  };

  const handleRemoveFromCart = (equipmentToRemove) => {
    const updatedList = selectedEquipmentList.filter(
      (equipment) => equipment.equipmentID !== equipmentToRemove.equipmentID
    );
    setSelectedEquipmentList(updatedList);
  };

  const handleSchedule = async () => {
    if (selectedEquipmentList.length > 0 && action) {
      const requestPayload = {
        userId: localStorage.getItem("userId"),
        action: action,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        items: selectedEquipmentList.map((equipment) => ({
          equipmentId: equipment.equipmentID,
          quantity: equipment.quantity,
        })),
      };

      const response = await fetch(`${BASE_URL}/api/EquipmentLogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Equipment request scheduled successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Clear form fields
        setAction("");
        setSelectedEquipmentList([]);
        setStartDate(new Date());
        setEndDate(new Date());
      } else {
        toast({
          title: "Error",
          description: "There was an error scheduling the equipment request.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box bgColor="lightblue">
      <Header />
      <Flex justify="center">
        <Box w="80%" px={4} mt={10}>
          <Heading as="h2" textAlign="center" mb={8} fontSize="3xl">
            Equipment Request System
          </Heading>

          <Box mb={4}>
            <Text mb={2}>Select Action:</Text>
            <Select
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="">Select Action</option>
              <option value="book">Book</option>
              <option value="use">Use</option>
              <option value="return">Return</option>
              <option value="damage">Damage</option>
            </Select>
          </Box>

          <Box mb={4}>
            <Text mb={2}>Select Equipment:</Text>
            <Flex>
              <Select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
              >
                <option value="">Select Equipment</option>
                {equipment.map((equipment) => (
                  <option
                    key={equipment.equipmentID}
                    value={equipment.equipmentName}
                  >
                    {equipment.equipmentName}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                max="10"
                width="80px"
                ml={2}
              />
              <Button ml={2} colorScheme="blue" onClick={handleAddToCart}>
                Add to List
              </Button>
            </Flex>
          </Box>

          <Box mb={4}>
            <Text mb={2}>Select Start Date:</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </Box>

          <Box mb={4}>
            <Text mb={2}>Select End Date:</Text>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </Box>

          <Button
            colorScheme="green"
            onClick={handleSchedule}
            disabled={selectedEquipmentList.length === 0 || !action}
          >
            Schedule
          </Button>
        </Box>

        <Box w="20%" px={4} mt={10}>
          <Heading as="h3" mb={4} fontSize="xl">
            Selected Equipment
          </Heading>
          {selectedEquipmentList.map((equipment) => (
            <Flex key={equipment.equipmentID} justify="space-between" mb={2}>
              <Text>{`${equipment.equipmentName} (x${equipment.quantity})`}</Text>
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => handleRemoveFromCart(equipment)}
              >
                Remove
              </Button>
            </Flex>
          ))}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default StudentAddRequest;
