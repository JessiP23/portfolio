import React, {useState} from "react";
import InitialPage from "./components/initialPage";
import ThreeDRoom from "./components/ThreeDRoom";

function MyPortfolio() {
  const [showThreeDRoom, setShowThreeDRoom] = useState(false);
  
  //function with showThreeDRoom true
  const retrieveThreeDRoom = () => {
    setShowThreeDRoom(true);
  };
 
  //if true, send to ThreeDRoom, if not, send to InitialPage
  return (
    <div className="App">
      {showThreeDRoom ? (
        <ThreeDRoom />
      ) : (
        <InitialPage showRoom = {retrieveThreeDRoom} />
      )}
    </div>
  );
}

export default MyPortfolio;
