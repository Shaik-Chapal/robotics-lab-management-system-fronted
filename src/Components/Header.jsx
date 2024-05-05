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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/actionItems";

const Header = () => {
  const state = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const Logout = () => {
    return (
      <Text
        onClick={handleLogout}
        _hover={{
          textDecoration: "underline solid rgb(0,96,169)",
          cursor: "pointer",
        }}
      >
        Logout
      </Text>
    );
  };

  function handleLogout() {
    localStorage.removeItem("credentials");
    dispatch({ type: logout });
    window.location.reload();
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
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
        display={["grid", "grid", "none", "none"]}
        gridTemplateColumns={"repeat(2,1fr)"}
        alignItems={"center"}
        bg={"#EEEEEE"}
        gap={15}
        pl={5}
        pt={4}
        pr={5}
      >
       
        <SimpleGrid
          gap={6}
          gridTemplateColumns={"repeat(3,1fr)"}
          alignItems={"center"}
          color={"#0060A9"}
          fontSize={"16px"}
          fontWeight={400}
        >
          <SimpleGrid textAlign={"center"}>
            <Flex w={["20%", "20%"]} m={"auto"}>
              <img src="src\assets\maps-and-flags.png" alt="" />
            </Flex>
            <Text>Warehouses</Text>
          </SimpleGrid>
          <SimpleGrid textAlign={"center"}>
            <Flex w={["30%", "20%"]} margin={"auto"}>
              <img src="src\assets\user.png" alt="" />
            </Flex>
            <Text>Account</Text>
          </SimpleGrid>
          <SimpleGrid textAlign={"center"}>
            <Link to="/cart">
              <Flex w={["73%", "20%"]} m={"auto"}>
                <img src="src\assets\grocery-store.png" alt="" />
              </Flex>
              <Text>Schedule</Text>
            </Link>
          </SimpleGrid>
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid
        bg={"#EEEEEE"}
        gridTemplateColumns={["1fr", "1fr", "0.4fr 2fr 1fr", "0.4fr 2fr 1fr"]}
        p={5}
        gap={7}
        alignItems={"center"}
        pl={["5", "5", "5", "16"]}
      >
        <Flex
          justifyContent={"center"}
          display={["none", "none", "flex", "flex"]}
          cursor={"pointer"}
        >
          <Link to={"/"}>
            <img
              src="https://www.costco.com/wcsstore/CostcoGLOBALSAS/images/Costco_Logo-1.png"
              alt=""
            />
          </Link>
        </Flex>

       
       
        <Flex
          gap={6}
          justifyContent={"center"}
          color={"#0060A9"}
          fontSize={"16px"}
          fontWeight={400}
          display={["none", "none", "flex", "flex"]}
        >
          {state.isAuth ? (
            <Logout />
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
          <Text
            _hover={{
              textDecoration: "underline solid rgb(0,96,169)",
              cursor: "pointer",
            }}
          >
            Order & Returns
          </Text>
          <Text fontSize="100%" mt="-0.8%" p="0.4%">
            |
          </Text>
          <Link to={"/cart"}>
            <Flex
              alignItems={"center"}
              gap={1}
              _hover={{
                textDecoration: "underline solid rgb(0,96,169)",
                cursor: "pointer",
              }}
            >
              <Box width={"5"}>
                <img src="src\assets\grocery-store.png" alt="" />
              </Box>{" "}
              Schedule
            </Flex>
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

            <Link to={"/supplier"}>
              <MenuItem>
                <Text>Supplier</Text>
              </MenuItem>
            </Link>

            <Link to={"/holiday"}>
              <MenuItem>
                <Text>Holiday</Text>
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
            Inventory Management Module
          </MenuButton>
          <MenuList color={"black"}>
          <Link to={"/labInstrumentPage"}>
              <MenuItem>
                <Text>Product</Text>
              </MenuItem>
            </Link>

            <Link to={"/inventoryTracking"}>
              <MenuItem>
                <Text>Inventory Tracking</Text>
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
          <Link to={"/random"}>
              <MenuItem>
                <Text>Equipment Availability Tracking</Text>
              </MenuItem>
            </Link>

            <Link to={"/baby"}>
              <MenuItem>
                <Text>Research Project </Text>
              </MenuItem>
            </Link>

            <Link to={"/beauty"}>
              <MenuItem>
                <Text>Resource Allocation</Text>
              </MenuItem>
            </Link>

            <Link to={"/computer"}>
              <MenuItem>
                <Text>Alerts and Notifications:</Text>
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
          <Link to={"/random"}>
              <MenuItem>
                <Text>Scheduling Module</Text>
              </MenuItem>
            </Link>

            <Link to={"/baby"}>
              <MenuItem>
                <Text>Message System</Text>
              </MenuItem>
            </Link>

            <Link to={"/beauty"}>
              <MenuItem>
                <Text> Feedback</Text>
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
             Membership
          </MenuButton>
          <MenuList color={"black"}>
          <Link to={"/random"}>
              <MenuItem>
                <Text>Scheduling Module</Text>
              </MenuItem>
            </Link>

            <Link to={"/baby"}>
              <MenuItem>
                <Text>Message System</Text>
              </MenuItem>
            </Link>

            <Link to={"/beauty"}>
              <MenuItem>
                <Text> Feedback</Text>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>

      </Flex>

      <Flex boxShadow={"base"} p={4} pl={14} justifyContent={"space-between"}>
        <Flex gap={["2", "2", "4", "10"]}>
          <SimpleGrid>
            <Text fontSize={"12px"} fontWeight={400}>
            Oulu University of Applied Sciences 
            </Text>
            <Flex alignItems={"center"}>
              <Box w={4}>
                {" "}
                <img src="src\assets\maps-and-flags.png" alt="" />
              </Box>{" "}
              <Text fontWeight={600}>Yliopistokatu 9, 90570 Oulu, Finland</Text>
            </Flex>
            <Text fontSize={"12px"} fontWeight={400} color={"red"}>
              Closed: Open 10:00AM Friday
            </Text>
          </SimpleGrid>

          
        </Flex>

       
      </Flex>
    </Box>
  );
};

export default Header;
