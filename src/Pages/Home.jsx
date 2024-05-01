import { Box } from "@chakra-ui/react";
import Header from "../Components/Header";
import SimpleSlider from "../Components/Homepage/Slider";
import Section1 from "../Components/Homepage/Section1";
import Footer from "../Components/Footer";


const Home = () => {
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
