import { Box } from "@chakra-ui/react";
import Header from "../Components/Header";
import SimpleSlider from "../Components/Homepage/Slider";
import Footer from "../Components/Footer";


const Home = () => {
  return (
    <Box>
      <Header />
      <SimpleSlider />
   
      <Footer />
    </Box>
  );
};

export default Home;
