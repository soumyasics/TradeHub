import "./modTakeTest.css";
export const ModTakeTest = ({ setIsTakeTestClicked }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "400px" }}
    >
      <div className="mod-take-test-box p-5">
        <p>Take a exam to check you eligblity to become a moderator</p>
        <button
          onClick={() => {
            setIsTakeTestClicked(true);
          }}
        >
          Take a test
        </button>
      </div>
    </div>
  );
};
