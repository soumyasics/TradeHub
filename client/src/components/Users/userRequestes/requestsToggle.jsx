import { Button } from "react-bootstrap";

export const RequestsToggle = ({ receivedRequest, setReceivedRequest }) => {
  return (
    <div className="">
      <div className="text-center">
        <div className="row">
          <div
            className="col-6 exchangebtn"
            onClick={() => {
              setReceivedRequest(true);
            }}
          >
            <div className="exchangepage-requestbtn">
              <div className="d-flex">
                <Button variant="white" size="lg">
                  Received Request
                </Button>
              </div>
            </div>
          </div>
          <div
            className="col-6 exchangebtn"
            onClick={() => {
              setReceivedRequest(false);
            }}
          >
            <div className="exchangepage-requestbtn">
              <div className="d-flex">
                <Button variant="white" size="lg">
                  Requested Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
