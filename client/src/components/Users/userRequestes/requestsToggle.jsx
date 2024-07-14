import { Button } from "react-bootstrap";

export const RequestsToggle = ({ receivedRequest, setReceivedRequest }) => {
  return (
    <div className="">
      <div class="text-center">
        <div class="row">
          <div
            class="col-6 exchangebtn"
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
            class="col-6 exchangebtn"
            onClick={() => {
              setReceivedRequest(false);
            }}
          >
            <div className="exchangepage-requestbtn">
              <div className="d-flex">
                <Button variant="white" size="lg">
                  Requested item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
