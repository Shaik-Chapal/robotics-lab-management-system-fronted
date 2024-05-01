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
import { Link, useNavigate } from "react-router-dom";
import { Email, Password } from "../Redux/actionItems";

const SignupPage = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = () => {
    if (confirmPassword !== state.password) {
      let cartObj = {
        title: "Failed",
        description: `Wrong Password`,
        status: "error",
        duration: 9000,
        isClosable: true,
      };
      toast(cartObj);
    } else {
      localStorage.setItem("credentials", JSON.stringify(state));
      navigate("/login");
    }
  };

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
        <SimpleGrid>
        <Flex justifyContent={"center"} p={4} bg={"#ffffff"}>
        <Box w={40}>
          <Link to={"/"}>
            <img src="src\assets\logo.png" alt="" />
          </Link>
        </Box>
      </Flex>
      <Text fontSize="36px" fontWeight="bold" color="blue.600" mb={5} textAlign="center">
            Signup
          </Text>
          <Box p={7} border={"1px solid rgba(0,0,0,0.2)"}>
            <FormControl>
              <Input
                type="email"
                placeholder="Email Address"
                border={"1px solid"}
                mb={3}
                onChange={(e) =>
                  dispatch({ type: Email, payload: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                border={"1px solid"}
                mb={6}
                onChange={(e) =>
                  dispatch({ type: Password, payload: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                border={"1px solid"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              

              <Button
                w={"100%"}
                mt={4}
                mb={3}
                fontWeight={400}
                bg={"#2A6293"}
                color={"#FFFFFF"}
                _hover={"none"}
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </FormControl>

            <Divider bg={"rgba(0,0,0,0.5)"} mt={2} mb={3}></Divider>

            <Flex fontWeight={400} fontSize={"16px"}>
              <Text fontWeight={400} fontSize={"18px"} mb={4}>
                Already have an account?
              </Text>
              <Link to={"/login"}>
                <Text
                  color={"#0056B3"}
                  ml={2}
                  _hover={{ textDecoration: "underline" }}
                  cursor={"pointer"}
                >
                  Sign In
                </Text>
              </Link>
            </Flex>
          </Box>
        </SimpleGrid>
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
export default SignupPage;
