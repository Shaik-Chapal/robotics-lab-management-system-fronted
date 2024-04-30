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
        <Flex width={20} cursor={"pointer"}>
          <Link to="/">
            <img
              src="https://www.costco.com/wcsstore/CostcoGLOBALSAS/images/Costco_Logo-1.png"
              alt=""
            />
          </Link>
        </Flex>
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
              <Text>Cart</Text>
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

        <Flex display={["flex", "flex", "none", "none"]} alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              bg={"#0060A9"}
              color={"white"}
              w={40}
              mr={2}
            >
              Inventory Management 
            </MenuButton>
            <MenuList color={"black"}>
              <Link to={"/baby"}>
                <MenuItem>
                  <Text>Baby</Text>
                </MenuItem>
              </Link>

              <Link to={"/beauty"}>
                <MenuItem>
                  <Text>Beauty</Text>
                </MenuItem>
              </Link>

              <Link to={"/mens-clothing"}>
                <MenuItem>
                  <Text>Clothing, Luggage & Handbags</Text>
                </MenuItem>
              </Link>

              <Link to={"/computer"}>
                <MenuItem>
                  <Text>Computers</Text>
                </MenuItem>
              </Link>

              <Link to={"/random"}>
                <MenuItem>
                  <Text>Costco Direct</Text>
                </MenuItem>
              </Link>

              <Link to={"/random"}>
                <MenuItem>
                  <Text>Costco Next</Text>
                </MenuItem>
              </Link>

              <Link to={"/computer"}>
                <MenuItem>
                  <Text>Electronics</Text>
                </MenuItem>
              </Link>

              <Link to={"/random"}>
                <MenuItem>
                  <Text>Floral & Gift Baskets</Text>
                </MenuItem>
              </Link>

              <Link to={"/furniture"}>
                <MenuItem>
                  <Text>Furniture</Text>
                </MenuItem>
              </Link>

              <Link to={"/"}>
                <MenuItem>
                  <Text>Gift Cards & Tickets</Text>
                </MenuItem>
              </Link>

              <Link to={"/beauty"}>
                <MenuItem>
                  <Text>Health & Personal Care</Text>
                </MenuItem>
              </Link>
              <Link to={"/patio-covers"}>
                <MenuItem>
                  <Text>Holiday & Seasonal</Text>
                </MenuItem>
              </Link>
              <Link to={"/furniture"}>
                <MenuItem>
                  <Text>Home & Installation Services</Text>
                </MenuItem>
              </Link>
              <Link to={"/patio-covers"}>
                <MenuItem>
                  <Text>Home & Kitchen</Text>
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>

          <Input
            placeholder="Search"
            bg={"white"}
            borderRadius={"none"}
            border={"1px solid blue"}
            outline={"none"}
          />
          <Button
            w={"100px"}
            bg={"white"}
            ml={2}
            outline={"none"}
            _active={{ bg: "none", scale: "1.1" }}
            border={"1px solid blue"}
            borderRadius={"none"}
          >
            <img
              src="src\assets\searchIcon-removebg-preview.png"
              alt=""
              width={"100%"}
            />
          </Button>
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
              Cart
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
            Inventory Management 
          </MenuButton>
          <MenuList color={"black"}>
            <Link to={"/baby"}>
              <MenuItem>
                <Text>Baby</Text>
              </MenuItem>
            </Link>

            <Link to={"/beauty"}>
              <MenuItem>
                <Text>Beauty</Text>
              </MenuItem>
            </Link>

            <Link to={"/mens-clothing"}>
              <MenuItem>
                <Text>Clothing, Luggage & Handbags</Text>
              </MenuItem>
            </Link>

            <Link to={"/computer"}>
              <MenuItem>
                <Text>Computers</Text>
              </MenuItem>
            </Link>

            <Link to={"/random"}>
              <MenuItem>
                <Text>Costco Direct</Text>
              </MenuItem>
            </Link>

            <Link to={"/random"}>
              <MenuItem>
                <Text>Costco Next</Text>
              </MenuItem>
            </Link>

            <Link to={"/computer"}>
              <MenuItem>
                <Text>Electronics</Text>
              </MenuItem>
            </Link>

            <Link to={"/random"}>
              <MenuItem>
                <Text>Floral & Gift Baskets</Text>
              </MenuItem>
            </Link>

            <Link to={"/furniture"}>
              <MenuItem>
                <Text>Furniture</Text>
              </MenuItem>
            </Link>

            <Link to={"/random"}>
              <MenuItem>
                <Text>Gift Cards & Tickets</Text>
              </MenuItem>
            </Link>

            <Link to={"/beauty"}>
              <MenuItem>
                <Text>Health & Personal Care</Text>
              </MenuItem>
            </Link>
            <Link to={"/patio-covers"}>
              <MenuItem>
                <Text>Holiday & Seasonal</Text>
              </MenuItem>
            </Link>
            <Link to={"/furniture"}>
              <MenuItem>
                <Text>Home & Installation Services</Text>
              </MenuItem>
            </Link>
            <Link to={"/furniture"}>
              <MenuItem>
                <Text>Home & Kitchen</Text>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>

        <Popover>
          <PopoverTrigger>
            <Text cursor={"pointer"} fontWeight={600} color={"white"}>
            Lab Resource Management 
            </Text>
          </PopoverTrigger>
          <PopoverContent w={600}>
            <PopoverArrow />
            <PopoverHeader fontWeight={700} cursor={"pointer"}>
              Grocery & Households
            </PopoverHeader>
            <PopoverBody
              color={"blue"}
              cursor={"pointer"}
              display={"grid"}
              gridTemplateColumns={"repeat(2,1fr)"}
              gap={`20`}
            >
              <Box>
                <Text>Gift Baskets</Text>
                <Text>Organic</Text>
                <Link to={"/baby"}>
                  <Text>Kirkland Signature Grocery</Text>
                </Link>
                <Text>Gourment Foods</Text>
                <Text>Meat</Text>
                <Text>Poultry</Text>
                <Text>Seafood</Text>
                <Text>Deli</Text>
                <Text>Cheese & Dairy</Text>
                <Text>Bakery & Desserts</Text>
                <Text>Snacks</Text>
                <Text>Candy</Text>
                <Text>Pantry & Dry Goods</Text>
                <Text>Breakfast</Text>
                <Text>Breverage & Water</Text>
              </Box>
              <SimpleGrid gap={6}>
                <Box>
                  <Text fontSize={"large"} color={"black"}>
                    Three Ways to Shop
                  </Text>
                  <Text fontWeight={600}>Delivery Methods :</Text>
                  <Text fontWeight={600}>Standard</Text>
                  <Text fontWeight={600} color={"green"}>
                    Same-Day Delivery
                  </Text>
                  <Text fontWeight={600} color={"blue"}>
                    2-Day Delivery
                  </Text>
                </Box>
                <Box>
                  <img
                    src="https://mobilecontent.costco.com/live/resource/img/23g0702/23g0702-grocery-feature.jpg"
                    alt=""
                  />
                  <img
                    src="https://mobilecontent.costco.com/live/resource/img/homepage/21w686-featured-popover-image.jpg"
                    alt=""
                  />
                </Box>
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>

       

        <Popover>
          <PopoverTrigger>
            <Text cursor={"pointer"} fontWeight={700} color={"white"}>
            Lab Resource Management 
            </Text>
          </PopoverTrigger>
          <PopoverContent w={600}>
            <PopoverArrow />
            <PopoverHeader fontWeight={700} cursor={"pointer"}>
              Shop Deals by Department
            </PopoverHeader>
            <PopoverBody cursor={"pointer"}>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                gap={10}
                color={"blue"}
              >
                <SimpleGrid gap={2}>
                  <Link to={"/computer"}>
                    <Text>Appliances</Text>
                  </Link>
                  <Link to={"/beauty"}>
                    <Text>Beauty</Text>
                  </Link>
                  <Link to={"/women-clothing"}>
                    <Text>Clothing, Luggage & Handbags</Text>
                  </Link>
                  <Link to={"/computer"}>
                    <Text>Computers</Text>
                  </Link>
                  <Link to={"/computer"}>
                    <Text>Electronics</Text>
                  </Link>
                  <Link to={"/computer"}>
                    <Text>Television</Text>
                  </Link>
                  <Link to={"/beauty"}>
                    <Text>Floral & Gift Baskets</Text>
                  </Link>
                  <Link to={"/furniture"}>
                    <Text>Furniture</Text>
                  </Link>
                  <Link to={"/furniture"}>
                    <Text>Grocery, Household Essentials & Pet</Text>
                  </Link>
                </SimpleGrid>
                <SimpleGrid gap={2}>
                  <Link to={"/random"}>
                    <Text>Health & Personal Care</Text>
                  </Link>
                  <Link to={"/furniture"}>
                    <Text>Home & Installation Services</Text>
                  </Link>
                  <Link to={"/furniture"}>
                    <Text>Home & Kitchen</Text>
                  </Link>
                  <Link to={"/patio-covers"}>
                    <Text>Home Improvements</Text>
                  </Link>
                  <Link to={"/random"}>
                    <Text>Jewelry, Watches & Sunglasses</Text>
                  </Link>
                  <Link to={"random"}>
                    <Text>Mattresses</Text>
                  </Link>
                  <Link to={"/patio-covers"}>
                    <Text>Patio, Lawn & Garden</Text>
                  </Link>
                  <Link to={"/random"}>
                    <Text>Sports & Fitness</Text>
                  </Link>
                  <Link to={"/random"}>
                    <Text>Tires & Auto</Text>
                  </Link>
                </SimpleGrid>
              </SimpleGrid>
              <Button
                w={"100%"}
                bg={"#0073A6"}
                color={"white"}
                _hover={"none"}
                mt={5}
              >
                Shop All Deals
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Text cursor={"pointer"} fontWeight={600} color={"white"}>
            Communication and Collaboration 
            </Text>
          </PopoverTrigger>
          <PopoverContent w={600}>
            <PopoverArrow />
            <PopoverBody cursor={"pointer"}>
              <Flex justifyContent={"center"} mb={4}>
                <img
                  src="https://cdn.bfldr.com/52U6WI5T/at/s62hgz99k73mmsz2jzbm5w/bse-flyout.psd?auto=webp&format=jpg"
                  alt=""
                />
              </Flex>
              <Box>
                <Text fontWeight={600} fontSize={"larger"} mb={2}>
                  Costco Business Center
                </Text>
                <Text mb={4}>
                  Find an expanded product selection for all types of
                  businesses, from professional <br /> offices to food service
                  operations. Our Costco Business Center warehouses are <br />{" "}
                  open to all members
                </Text>
              </Box>
              <Text fontWeight={600} fontSize={"1.5rem"} mb={2}>
                Shop by Department
              </Text>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                gap={5}
                mb={2}
                color={"blue"}
              >
                <SimpleGrid gap={3}>
                  <Text>Beverages</Text>
                  <Text>Candy & Snacks</Text>
                  <Text>Disposables</Text>
                  <Text>Commercial Appliances</Text>
                </SimpleGrid>
                <SimpleGrid gap={3}>
                  <Text>Grocery</Text>
                  <Text>Janitorial Supplies</Text>
                  <Text>Office</Text>
                  <Text>Restaurant</Text>
                </SimpleGrid>
              </SimpleGrid>
              <Button
                w={"100%"}
                bg={"#0073A6"}
                color={"white"}
                _hover={"none"}
                mt={5}
              >
                Shop CostcoBusinessDelivery.com
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>

       

       




        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <PopoverTrigger>
            <Text
              cursor={"pointer"}
              fontWeight={600}
              color={"white"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Membership
            </Text>
          </PopoverTrigger>
          <PopoverContent
            w={270}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <PopoverArrow />
            <PopoverBody cursor={"pointer"}>
              <SimpleGrid gap={3} color={"blue"}>
                <Text>Join Today</Text>
                <Text>Renew Membership</Text>
                <Text>Upgrade to Executive</Text>
                <Text>Why Become A Member</Text>
                <Text>Credit Card</Text>
                <Flex justifyContent={"center"}>
                  <img
                    src="https://mobilecontent.costco.com/live/resource/img/homepage/NavBar-membership-21w239.jpg"
                    alt=""
                  />
                </Flex>
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>

 
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
              <Text fontWeight={600}>Seattle</Text>
            </Flex>
            <Text fontSize={"12px"} fontWeight={400} color={"red"}>
              Closed: Open 10:00AM Friday
            </Text>
          </SimpleGrid>

          
        </Flex>

        <Text
          color={"blue"}
          cursor={"pointer"}
          display={["none", "none", "block", "block"]}
        >
          Lists/ Buy Again
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
