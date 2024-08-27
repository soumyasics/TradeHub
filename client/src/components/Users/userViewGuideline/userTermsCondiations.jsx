import { useEffect, useState } from "react";
import "./userViewGuideline.css";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { UserChatNavbar } from "../usersChat/userChatNavbar/userChatNavbar";
export const UserTermsAndConditions = () => {
  const [state, setState] = useState({
    title: "Our terms and conditions",
    content:
      "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.",
  });

  const content =
    "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.";
  useEffect(() => {
    axiosInstance
      .get("/viewGuideline")
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          setState(res.data.data);
        } else if (res.status === 201) {
          setState({
            title: "Our terms and conditions",
            content:
              "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.",
          });
        } else {
        }
      })
      .catch((err) => {
        toast.error(err.data.msg);
      });
  }, []);
  return (
    <div>
      <UserChatNavbar />
      <div style={{ minHeight: "100vh" }} className="userViewGuideline-body">
        <h1 className="userViewGuideline-heading text-capitalize ">
          Our terms and conditions
        </h1>
        {/* <h3>Content</h3> */}
        <p>{content}</p>
      </div>
    </div>
  );
};
