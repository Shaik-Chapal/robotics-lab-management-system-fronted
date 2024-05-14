import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  SimpleGrid,
  Text,
  useToast,
  Grid, GridItem
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Authentication ,BASE_URL} from "../Redux/actionItems";
import { Routes, Route } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  


  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        const userId = data.data.user.id;
        localStorage.setItem("userId", userId);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch({ type: Authentication });
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  if (state.isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box>
      
    
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>

<GridItem  m={0}>
  <SimpleGrid
              
               justifyContent={"center"}
               alignItems={"center"}
               w={["90%", "70%", "50%", "90%"]}
               m={"auto"}
               
      >
        <Flex justifyContent={"center"} p={4} bg={"#ffffff"}>
        <Box w={40}>
          <Link to={"/"}>
            <img src="src\assets\logo.png" alt="" />
          </Link>
        </Box>
      </Flex>
      <Text fontSize="36px" fontWeight="bold" color="blue.600" mb={5} textAlign="center">
  Sign In
</Text>


          <Box p={7} border={"1px solid rgba(0,0,0,0.2)"}>
            <FormControl>
              <Input
                type="email"
                placeholder="Email Address"
                border={"1px solid"}
                mb={3}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                border={"1px solid"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text
                color={"rgb(0,96,169)"}
                fontSize={"12px"}
                _hover={{ textDecoration: "underline" }}
                fontWeight={400}
                cursor={"pointer"}
                m={2}
              >
                Forgot Password?
              </Text>
              <Flex mt={5} mb={4}>
                <input type="checkbox" />
                <Text fontWeight={400} fontSize={"14px"}>
                  Keep me signed in
                </Text>
              </Flex>
           

              <Button
                w={"100%"}
                mt={4}
                mb={3}
                fontWeight={400}
                bg={"#2A6293"}
                color={"#FFFFFF"}
                _hover={"none"}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </FormControl>

            <Divider bg={"rgba(0,0,0,0.5)"} mt={2} mb={3}></Divider>
            <Text fontWeight={400} fontSize={"18px"} mb={4}>
              New to RLMS?
            </Text>
            <Link to={"/signup"}>
              <Button color={"#2A6293"} bg={"#EEEEEE"} w={"100%"}>
                Create Account
              </Button>
            </Link>
          </Box>
        </SimpleGrid>
        </GridItem>
  
        <GridItem bg='blue.100' m={50}>
        <SimpleGrid
  justifyContent={"right"}
  alignItems={"center"}
  w={["90%", "70%", "50%", "90%"]}
  m={"auto"}

  
 
>
  <img src="src\assets\robot.jpg" alt=""  /> {/* Add mt={5} for 5 units of margin-top */
  }
</SimpleGrid>
</GridItem>
 
</Grid>
     

    </Box>
  );
};

export default LoginPage;
