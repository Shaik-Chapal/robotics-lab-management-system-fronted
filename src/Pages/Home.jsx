import { Box } from "@chakra-ui/react";
import Header from "../Components/Header";
import SimpleSlider from "../Components/Homepage/Slider";
import Section1 from "../Components/Homepage/Section1";
import Section2 from "../Components/Homepage/Section2";
import Footer from "../Components/Footer";
import MultipleItems from "../Components/Homepage/MultipleItemsSlider";


const Home = () => {
  return (
    <Box>
      <Header />
      <SimpleSlider />
      <Section1 />
      <Section2 />
      <MultipleItems />
      <Footer />
    </Box>
  );
};

export default Home;
