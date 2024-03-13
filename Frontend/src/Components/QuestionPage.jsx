import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestion } from "./axios";

const QuestionPage = () => {
  const location = useLocation().pathname.split("/");
  const groupId = location[2];
  const userId = location[3];

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsArray = await getQuestion(groupId, userId);
        console.log(questionsArray);
        setQuestions(questionsArray);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [groupId, userId]);

  const handleOptionSelect = (opt) => {
    setSelectedOption(opt);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption("");
    if (currentQuestion + 1 === questions.length) {
      setShowModal(true);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container mx-auto mt-4 p-4">
        <p className="text-lg font-medium my-2">
          {`Q.${currentQuestion + 1}`} &nbsp;
          {questions[currentQuestion].question}
        </p>
        <ul className="list-decimal pl-6">
          {questions[currentQuestion].options.map((opt, idx) => (
            <li
              key={idx}
              className={`${
                selectedOption === opt
                  ? "text-blue-700 font-semibold text-lg"
                  : "text-gray-950"
              }`}
              onClick={() => handleOptionSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleNextQuestion}
        >
          {currentQuestion + 1 === questions.length
            ? "Show Result"
            : "Next Question"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-center text-2xl font-semibold mb-4">{score}</h2>
            <p>Your quiz has been completed. Thank you for participating!</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
