import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Components/User";
import QuestionForm from "./Components/QuestionForm";
import QuestionPage from "./Components/QuestionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/questionform/:id" element={<QuestionForm />} />
        <Route path="/questionpage/:gid/:uid" element={<QuestionPage />} />
        <Route path="/leaderboard" element={<QuestionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
