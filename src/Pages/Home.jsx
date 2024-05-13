import { Box } from "@chakra-ui/react";
import Header from "../Components/Header";
import SimpleSlider from "../Components/Homepage/Slider";
import Section1 from "../Components/Homepage/Section1";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";


const Home = () => {
  const state = useSelector((state) => state.authentication);
  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Header />
      <SimpleSlider />
      <Section1 />
      <Footer />
    </Box>
  );
};

export default Home;
