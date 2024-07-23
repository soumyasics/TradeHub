import { useState } from "react";
import { ModTakeTest } from "../modTakeTest/modTakeTest";
import ModeratorQuiz from "./moderatorQuiz";

export const ModTestContainer = ({navigateToOverview}) => {
  const [isTakeTestClicked, setIsTakeTestClicked] = useState(false);

  return (
    <div>
      {isTakeTestClicked ? (
        <ModeratorQuiz navigateToOverview={navigateToOverview}/>
      ) : (
        <div className="d-flex justify-content-center align-items-center ">
          <ModTakeTest setIsTakeTestClicked={setIsTakeTestClicked} />
        </div>
      )}
    </div>
  );
};
