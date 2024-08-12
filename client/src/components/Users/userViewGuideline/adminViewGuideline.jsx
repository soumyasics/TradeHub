import { useEffect, useState } from "react";
import "./userViewGuideline.css";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { UserChatNavbar } from "../usersChat/userChatNavbar/userChatNavbar";
import { Button, Form } from "react-bootstrap";
export const AdminViewNewGuideline = ({ user }) => {
  const [state, setState] = useState({
    title: "Our terms and conditions",
    content:
      "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.",
  });
  const [editActive, setEditActive] = useState(false);
  const [editState, setEditState] = useState({
    title: "",
    content: "",
  });
  const [guidelineId, setGuidlineId] = useState("");
  const content =
    "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.";
  useEffect(() => {
    getData();
  }, []);

  const createNewGuidelines = async () => {
    try {
      const res = await axiosInstance.post("/createGuideline", editState);
      if (res.status === 200) {
        toast.success("Guideline edited successfully");
        
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }finally {
      setEditActive(false);
      getData();
    }
  };

  const getData = () => {
    axiosInstance
      .get("/viewGuideline")
      .then((res) => {
        if (res.status == 200) {
          setGuidlineId(res.data.data._id);
          setState(res.data.data);
        } else if (res.status === 201) {
          setState({
            title: "Our terms and conditions",
            content:
              "When using our product exchange app, please adhere to the following guidelines to ensure a positive and respectful community. Always treat other users with respect and kindness, avoiding offensive language. Provide honest and detailed descriptions of your products to facilitate fair exchanges. Communicate promptly and clearly, informing the other party if you cannot complete an exchange. Respect the privacy of others by not sharing personal information without consent and report any issues or suspicious activity to moderators immediately. Engage in positive interactions and be courteous in all communications. Respond to inquiries and exchange requests timely and upload clear, accurate photos of your products. Keep your commitments and follow through with agreed exchanges. Leave honest feedback after each transaction to build trust and improve the community. Arrange exchanges in safe, public places or use the app’s recommended methods for secure transactions. Finally, follow moderators' instructions and respect their decisions regarding point assignments and disputes. By following these guidelines, you help create a trustworthy and enjoyable experience for everyone.",
          });
        }
      })
      .catch((err) => {
        toast.error(err.data.msg);
      });
  };
  useEffect(() => {
    setEditState(state);
  }, [state]);

  const editGuideline = async () => {
    if (!editState.title || !editState.content) {
      toast.error("Title and content are required");
      return;
    }
    if (!guidelineId) {
      createNewGuidelines();
      return;
    }
    // const res = await axiosInstance.post('/')
    try {
      const res = await axiosInstance.patch(`/editGuidelines/${guidelineId}`, {
        title: editState.title,
        content: editState.content,
      });
      if (res.status === 200) {
        toast.success("Guideline edited successfully");
        setEditActive(false);
      }
    } catch (err) {
      console.log("Error on edit guideline", err);
    } finally {
      getData();
    }
  };
  return (
    <div>
      <UserChatNavbar />
      {editActive ? (
        <div className="userViewGuideline-body mt-5">
          <Form>
            <Form.Control
              type="text"
              placeholder="Title"
              value={editState.title}
              onChange={(e) => {
                setEditState({ ...editState, title: e.target.value });
              }}
            />
            <Form.Control
              className="mt-5"
              rows="10"
              as="textarea"
              value={editState.content}
              placeholder="Content"
              onChange={(e) => {
                setEditState({ ...editState, content: e.target.value });
              }}
            />
          </Form>
          <div className="d-flex justify-content-around mt-5">
            <Button variant="success" className="w-25" onClick={editGuideline}>
              {" "}
              Save{" "}
            </Button>
            <Button
              onClick={() => setEditActive(false)}
              variant="warning"
              className="w-25"
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ minHeight: "50vh" }} className="userViewGuideline-body">
            <h1 className="userViewGuideline-heading text-capitalize ">
              {state?.title || "Our terms and conditions"}
            </h1>

            {/* <h3>Content</h3> */}
            <p>{state?.content || content}</p>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              onClick={() => {
                setEditActive(true);
              }}
            >
              {" "}
              Edit{" "}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
