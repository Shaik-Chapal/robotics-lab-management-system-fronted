import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT, BASE_URL } from "../Redux/actionItems";

const Header = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [universityData, setUniversityData] = useState(null);
  const [claimValue, setClaimValue] = useState(localStorage.getItem("claimValue") || "");


  useEffect(() => {
    fetchUniversityData();
  }, []);

  const fetchUniversityData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/University`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUniversityData(data);
    } catch (error) {
      console.error("Error fetching university data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch({ type: LOGOUT });
    window.location.reload();
  };

  return (
    <Box>
      <Text
        textAlign={"center"}
        fontSize={"20px"}
        fontWeight={700}
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
        bg={
          "linear-gradient(90deg, rgba(66,234,247,1) 0%, rgba(0,255,151,1) 100%)"
        }
        p={0.5}
      >
        Robotics Lab Management System
      </Text>

      <SimpleGrid
        bg={"#EEEEEE"}
        gridTemplateColumns={["1fr", "1fr", "0.4fr 2fr 1fr", "0.4fr 2fr 1fr"]}
        p={5}
        gap={7}
        alignItems={"center"}
      >
        <Flex
          justifyContent={"center"}
          display={["none", "none", "flex", "flex"]}
          cursor={"pointer"}
        >
        </Flex>
        <Flex
          justifyContent={"center"}
          display={["none", "none", "flex", "flex"]}
          cursor={"pointer"}
        >
        </Flex>
        <Flex
          gap={6}
          justifyContent={"center"}
          color={"#0060A9"}
          fontSize={"16px"}
          fontWeight={400}
          display={["none", "none", "flex", "flex"]}
        >
          {state.isAuthenticated ? (
            <Text
              onClick={handleLogout}
              _hover={{
                textDecoration: "underline solid rgb(0,96,169)",
                cursor: "pointer",
              }}
            >
              Logout
            </Text>
          ) : (
            <Link to={"/login"}>
              <Text
                _hover={{
                  textDecoration: "underline solid rgb(0,96,169)",
                  cursor: "pointer",
                }}
              >
                Sign In/Register
              </Text>
            </Link>
          )}

          <Text fontSize="100%" mt="-0.8%" p="0.4%">
            |
          </Text>
          <Link to="/profile">

          <Text
            _hover={{
              textDecoration: "underline solid rgb(0,96,169)",
              cursor: "pointer",
            }}
          >
            Profile
          </Text>
          </Link>
         
         
        </Flex>
      
        
      </SimpleGrid>

      <Flex
        display={["none", "none", "none", "flex"]}
        bg={"#0073A6"}
        gap={10}
        alignItems={"center"}
        pl={"50px"}
      >
        <Menu>
          <MenuButton
            as={Button}
            bg={"#0073A6"}
            color={"white"}
            textAlign={"center"}
            _hover={"none"}
            _active={"none"}
            fontWeight={700}
          >
            User Management 
          </MenuButton>
          <MenuList color={"black"}>


          {claimValue !== "Student" && (
              <>

          <Link to={"/university"}>
              <MenuItem>
                <Text>University</Text>
              </MenuItem>
            </Link>
          <Link to={"/department"}>
              <MenuItem>
                <Text>Department</Text>
              </MenuItem>
            </Link>
            <Link to={"/student"}>
              <MenuItem>
                <Text>Student</Text>
              </MenuItem>
            </Link>
            <Link to={"/staff"}>
              <MenuItem>
                <Text>Staff</Text>
              </MenuItem>
            </Link>

            <Link to={"/teacher"}>
              <MenuItem>
                <Text>Teacher</Text>
              </MenuItem>
            </Link>


            <Link to={"/supplier"}>
              <MenuItem>
                <Text>Supplier</Text>
              </MenuItem>
            </Link>
            </>
            )}
            <Link to={"/holiday"}>
              <MenuItem>
                <Text>Holiday</Text>
              </MenuItem>
            </Link>
      
          </MenuList>
        </Menu>

        {claimValue !== "Student" && (
              <>
        <Menu>
          <MenuButton
            as={Button}
            bg={"#0073A6"}
            color={"white"}
            textAlign={"center"}
            _hover={"none"}
            _active={"none"}
            fontWeight={700}
          >
            Inventory Management Module
          </MenuButton>
          <MenuList color={"black"}>
          <Link to={"/groupScreen"}>
              <MenuItem>
                <Text>Group</Text>
              </MenuItem>
            </Link>
          <Link to={"/labInstrumentPage"}>
              <MenuItem>
                <Text>Product</Text>
              </MenuItem>
            </Link>
            <Link to={"/purchaseOrder"}>
              <MenuItem>
                <Text>Purchase Order</Text>
              </MenuItem>
            </Link>

            <Link to={"/inventoryTracking"}>
              <MenuItem>
                <Text>Inventory Tracking</Text>
              </MenuItem>
            </Link>

            <Link to={"/inventoryControl"}>
              <MenuItem>
                <Text>Inventory Control</Text>
              </MenuItem>
            </Link>
            <Link to={"/stockManagement"}>
              <MenuItem>
                <Text>Stock Management</Text>
              </MenuItem>
            </Link>

            <Link to={"/alertsNotifications"}>
              <MenuItem>
                <Text>Alerts and Notifications</Text>
              </MenuItem>
            </Link>

           

            
      
          </MenuList>
        </Menu>
        </>
            )}

        <Menu>
          <MenuButton
            as={Button}
            bg={"#0073A6"}
            color={"white"}
            textAlign={"center"}
            _hover={"none"}
            _active={"none"}
            fontWeight={700}
          >
            Lab Resource Management 
          </MenuButton>
          <MenuList color={"black"}>
          <Link to={"/studentAddRequest"}>
              <MenuItem>
                <Text>Equipment Request System</Text>
              </MenuItem>
            </Link>

            {/* <Link to={"/equipmentRequestSystem"}>
              <MenuItem>
                <Text>Equipment Approval System</Text>
              </MenuItem>
            </Link> */}

{claimValue !== "Student" && (
              <>
           

            <Link to={"/resourceApproval"}>
              <MenuItem>
                <Text>Resource Allocation</Text>
              </MenuItem>
            </Link>
            </>
            )}

            <Link to={"/resultSharing"}>
              <MenuItem>
                <Text>Result Sharing</Text>
              </MenuItem>
            </Link>
          
            <Link to={"/researchnews"}>
              <MenuItem>
                <Text>Research Project </Text>
              </MenuItem>
            </Link>
           

            
      
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            bg={"#0073A6"}
            color={"white"}
            textAlign={"center"}
            _hover={"none"}
            _active={"none"}
            fontWeight={700}
          >
             Communication and Collaboration 
          </MenuButton>
          <MenuList color={"black"}>
          {/* <Link to={"/schedulingModule"}>
              <MenuItem>
                <Text>Scheduling Module</Text>
              </MenuItem>
            </Link> */}

            <Link to={"/messageSystem"}>
              <MenuItem>
                <Text>Message System</Text>
              </MenuItem>
            </Link>

            <Link to={"/feedback"}>
              <MenuItem>
                <Text> Feedback</Text>
              </MenuItem>
            </Link>

           
           

            
      
          </MenuList>
        </Menu>
       

      </Flex>

      <Flex boxShadow={"base"} p={4} pl={14} justifyContent={"space-between"}>
        {universityData && (
          <Flex gap={["2", "2", "4", "10"]}>
            <SimpleGrid>
              <Text fontSize={"12px"} fontWeight={400}>
                {universityData.name}
              </Text>
              <Flex alignItems={"center"}>
                <Text fontWeight={600}>{universityData.address}</Text>
              </Flex>
              <Text fontSize={"12px"} fontWeight={400} color={"red"}>
                {`Closed: ${universityData.closeTime}. Open : ${universityData.openTime} `}
              </Text>
            </SimpleGrid>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
