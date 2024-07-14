import Footer from "../../Footer/Footer";
import UserMainNav from "../UserMainNav";
import { ReceivedRequest } from "./receivedRequest";
import { RequestedItems } from "./requestedItems";
import { RequestsToggle } from "./requestsToggle";
import { useState } from "react";
export const UserRequestes = () => {
  const [receivedRequest, setReceivedRequest] = useState(false);

  return (
    <div>
      <UserMainNav />
      <RequestsToggle
        receivedRequest={receivedRequest}
        setReceivedRequest={setReceivedRequest}
      />
      <div style={{ minHeight: "600px" }}>
        {receivedRequest ? <ReceivedRequest /> : <RequestedItems />}
      </div>
      <Footer />
    </div>
  );
};
