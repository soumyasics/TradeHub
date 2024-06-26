import { useState } from "react";
import  { ModNavbar } from "../../components/homeComponents/Navbar/Navbar";
import NavbarResponsive from "../../components/homeComponents/NavbarResponsive/NavbarResponsive";
import Hero from "../../components/homeComponents/Hero/Hero";
import Features from "../../components/homeComponents/Features/Features";
import Growth from "../../components/homeComponents/Growth/Growth";
// import Questions from "../../components/homeComponents/Questions/Questions";
import Programs from "../../components/homeComponents/Programs/Programs";
import Footer from "../../components/Footer/Footer";

import { programs_user } from "../../constants/programs_user";
import { programs_shopper } from "../../constants/programs_shopper";

export const ModeratorHome = () => {
  const [hamActive, setHamActive] = useState(false);
  return (
    <div className="App">
      <ModNavbar hamActive={hamActive} setHamActive={setHamActive}/>
      <NavbarResponsive hamActive={hamActive} />
      <Hero />
      <Features />
      <Growth />
      {/* <Questions /> */}
      {/* <Programs programs={programs_user} /> */}
      {/* <Programs programs={programs_shopper} /> */}
      <Footer />
    </div>
  );
};
