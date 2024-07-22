import Footer from "../../Footer/Footer";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";
import "./modTakeTest.css";
export const ModTakeTest = () => {
  return (
    <div>
      <UserNavbar/>
    <div style={{minHeight:"65vh"}}>
      <div className="mod-take-test-box ">
        <p>Take a exam to check you eligblity to become a moderator</p>
        <button>Take a test</button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};
