import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Quiz from "./quiz/Quiz";
import Game from "./quiz/Game"; // Make sure to import the Game component
import AgeGame from "./quiz/AgeGame"; // Make sure to import the Game component
import Wiki from "./wiki/Wiki";
import PersonDetail from "./wiki/PersonDetail";
import HomePage from "./HomePage";

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/play-game" element={<Game />} />{" "}
            {/* Add this route for the Game component */}
            <Route path="/play-age-game" element={<AgeGame />} />{" "}
            {/* Add this route for the Game component */}
            <Route path="/wiki/:personId" element={<PersonDetail />} />
          </Routes>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>© Jan Mańczak</Footer> */}
      </Layout>
    </Router>
  );
};

export default App;
