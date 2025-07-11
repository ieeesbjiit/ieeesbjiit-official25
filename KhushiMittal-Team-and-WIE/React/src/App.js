import React from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Teams from "./components/Teams";
import WIE from "./components/WIE";

function App() {
  return (
    <BackgroundWrapper>
      <div style={{ textAlign: "center", padding: "3rem" }}>
      </div>
       <Teams />
       <WIE />
    </BackgroundWrapper>
  );
}

export default App;
