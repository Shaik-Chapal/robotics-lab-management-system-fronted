import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box mt={5}>
      <Box  bg={"#EEEEEE"}>
       

        <Divider
          border={"1px solid #DDDDDD"}
          m={5}
          display={["none", "none", "block", "block"]}
        />

        <SimpleGrid
          justifyContent={"center"}
          gridTemplateColumns={"repeat(3,1fr)"} // Adjusted to have 3 columns
          display={["none", "none", "grid", "grid"]}
          gap={10} // Adjusted gap for equal spacing
          cursor={"pointer"}
        >
          <SimpleGrid textAlign={"left"} fontWeight={400}>
            <Box>
              <Text
                _hover={{ textDecoration: "underline" }}
                mb={3}
                fontSize={"20px"}
              >
                About Us
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
               
                <Text _hover={{ textDecoration: "underline" }}>
                  Information
                </Text>
             
               
              </SimpleGrid>
            </Box>
          </SimpleGrid>

         

          <SimpleGrid textAlign={"left"} fontWeight={400}>
            <Box>
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize={"20px"}
                mb={3}
              >
                Student Service
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
              
              
               
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          <SimpleGrid textAlign={"left"} fontWeight={400}>
            <Box>
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize={"20px"}
                mb={3}
              >
                 Services
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
               
                
              
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </SimpleGrid>

  
       

        <Text
          color={"rgb(95, 95, 95)"}
          fontSize={"14px"}
          fontWeight={400}
          textAlign={"center"}
          mt={10}
        >
          ©Created By Chapal Shaik.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
