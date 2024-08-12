import { useEffect, useState } from "react";
import { ModTutorialDetails } from "../modTutorialDetails/modTutorialDetails";
import { ModTutorialCard } from "./modTutorialCard";
import { AdminTutorialDetails } from "../modTutorialDetails/adminTutorialDetails";

export const AdminVideoContainer = ({id}) => {
  const [selectedVideoId, setSelectedVideoId] = useState("");
  function changeSelected (value)  {
    if (value) {
        setSelectedVideoId(value)
    }else {
        setSelectedVideoId("")
    }
  }

  useEffect(() => {
    setSelectedVideoId(id)
  }, [id])

  return (
    <div>
      {selectedVideoId ? (
        <AdminTutorialDetails changeSelected={changeSelected} selectedVideoId={selectedVideoId} />
      ) : (
        <ModTutorialCard changeSelected={changeSelected}/>
        
      )}
    </div>
  );
};
