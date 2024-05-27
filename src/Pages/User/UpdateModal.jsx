import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";


const UpdateModal = ({ isOpen, onClose, onUpdate, universityData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    openTime: '',
    closeTime: '',
    website: '',
  });

  useEffect(() => {
    if (universityData) {
      setFormData({
        name: universityData.name || '',
        email: universityData.email || '',
        phone: universityData.phone || '',
        address: universityData.address || '',
        openTime: universityData.openTime || '',
        closeTime: universityData.closeTime || '',
        website: universityData.website || '',
      });
    }
  }, [universityData]);

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.website) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onUpdate(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update University</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Open Time</FormLabel>
            <input type="time" name="time"/>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Close Time</FormLabel>
            <input type="time" name="time"/>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Website</FormLabel>
            <Input
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
