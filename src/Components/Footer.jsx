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
      <Box p={[6, 6, 16, 20]} pb={["5", "5", "5", "5"]} bg={"#EEEEEE"}>
        <SimpleGrid
          gridTemplateColumns={[
            "repeat(1,1fr)",
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(5,1fr)",
          ]}
          gap={12}
        >
        
        </SimpleGrid>

        <Divider
          border={"1px solid #DDDDDD"}
          m={5}
          display={["none", "none", "block", "block"]}
        />

        <SimpleGrid
          justifyContent={"center"}
          gridTemplateColumns={"repeat(4,1fr)"}
          display={["none", "none", "grid", "grid"]}
          gap={30}
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
                  Charitable Contributions
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Company Information
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Sustainability Commitment
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Investor Relations
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>Careers</Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Kirkland Signature
                </Text>
               
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          <SimpleGrid textAlign={"left"} fontWeight={400} gap={3}>
            <Box>
              <Text
                mb={3}
                _hover={{ textDecoration: "underline" }}
                fontSize={"20px"}
              >
                Membership
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
                <Text _hover={{ textDecoration: "underline" }}>Join Now</Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Member Privileges
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Executive Membership Terms
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Sign In or Register
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Credit Card
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
                Customer Service
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
                <Text _hover={{ textDecoration: "underline" }}>
                  Costco Shop Card Balance
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Order By Item Number
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Costco Technical & Warranty
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>Services</Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Volume Sales: Export & Domestic
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Order Status
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Preventing Fraud
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
                Locations & Services
              </Text>

              <SimpleGrid color={"rgb(95, 95, 95)"}>
                <Text _hover={{ textDecoration: "underline" }}>
                  Find a Warehouse
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Locations Coming Soon
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Hours and Holiday Closures
                </Text>
                <Text _hover={{ textDecoration: "underline" }}>Gasoline</Text>
                <Text _hover={{ textDecoration: "underline" }}>
                  Hearing Aid Center
                </Text>
              
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </SimpleGrid>

  
        <SimpleGrid
          gridTemplateColumns={"repeat(4,1fr)"}
          w={"50%"}
          m={"auto"}
          mt={4}
          alignItems={"center"}
          display={["grid", "grid", "grid", "none"]}
        >
          <Box cursor={"pointer"} w={8}>
            <Link
              to={"https://www.facebook.com/p/Costco-100054550206105/"}
              target="_blank"
            >
              <img
                src="https://www.costco.com/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-facebook.svg"
                alt=""
                width={"100%"}
              />
            </Link>
          </Box>

          <Box cursor={"pointer"} w={8}>
            <Link to={"https://in.pinterest.com/costco/"} target="_blank">
              <img
                src="https://www.costco.com/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-pinterest.svg"
                alt=""
                width={"100%"}
              />
            </Link>
          </Box>

          <Box cursor={"pointer"} w={8}>
            <Link to={"https://www.instagram.com/costco/"} target="_blank">
              <img
                src="src\assets\HomeIMG\Footer\social-instagram.svg"
                alt=""
                width={"100%"}
              />
            </Link>
          </Box>

          <Box cursor={"pointer"} w={8} mt={2}>
            <Link
              to={
                "https://play.google.com/store/apps/details?id=com.costco.app.android&hl=en&gl=US"
              }
              target="_blank"
            >
              <img
                src="https://www.costco.com/wcsstore/RWDStaticAssets/fonts/fallback-icons/icons/social-instagram.svg"
                alt=""
              />
            </Link>
          </Box>
        </SimpleGrid>

        <Text
          color={"rgb(95, 95, 95)"}
          fontSize={"14px"}
          fontWeight={400}
          textAlign={"center"}
          mt={10}
        >
          © 1998 — 2024 Costco Wholesale Corporation. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
