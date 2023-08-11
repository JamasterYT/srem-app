import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Quiz from "./quiz/Quiz";
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
            <Route path="/wiki/:personId" element={<PersonDetail />} />
          </Routes>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>© Jan Mańczak</Footer> */}
      </Layout>
    </Router>
  );
};

export default App;