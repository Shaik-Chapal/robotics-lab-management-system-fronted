import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
const EquipmentManagementScreen = () => {
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'Equipment 1', description: 'Description 1', quantity: 5, status: 'Available' },
    { id: 2, name: 'Equipment 2', description: 'Description 2', quantity: 3, status: 'In Use' },
    { id: 3, name: 'Equipment 3', description: 'Description 3', quantity: 10, status: 'Available' },
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEquipment = () => {
    // Add your logic to add new equipment
    onClose();
  };

  const handleEditEquipment = () => {
    // Add your logic to edit equipment
    onClose();
  };

  const handleDeleteEquipment = (id) => {
    // Add your logic to delete equipment
  };

  return (
    <Box p={4}>
       <Header />
      <Flex align="center">
        <Heading mr={4}>Equipment Management</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => { setModalMode('add'); onOpen(); }}>
          Add Equipment
        </Button>
      </Flex>

      <Table variant="striped" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Quantity</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {equipmentList.map((equipment) => (
            <Tr key={equipment.id}>
              <Td>{equipment.name}</Td>
              <Td>{equipment.description}</Td>
              <Td>{equipment.quantity}</Td>
              <Td>{equipment.status}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  aria-label="Edit Equipment"
                  mr={2}
                  onClick={() => { setSelectedEquipment(equipment); setModalMode('edit'); onOpen(); }}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="Delete Equipment"
                  onClick={() => handleDeleteEquipment(equipment.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalMode === 'add' ? 'Add Equipment' : 'Edit Equipment'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter equipment name" />
              <FormHelperText>Description</FormHelperText>
              <Input placeholder="Enter equipment description" />
              <FormHelperText>Quantity</FormHelperText>
              <Input type="number" placeholder="Enter equipment quantity" />
              <FormHelperText>Status</FormHelperText>
              <Input placeholder="Enter equipment status" />
            </FormControl>
          </ModalBody>
          <Flex justify="flex-end" p={4}>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={modalMode === 'add' ? handleAddEquipment : handleEditEquipment}>
              {modalMode === 'add' ? 'Add' : 'Save'}
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EquipmentManagementScreen;
