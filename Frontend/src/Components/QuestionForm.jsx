import { useEffect, useState } from "react";
import { saveQuestion } from "./axios";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const QuestionForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const groupId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    let userId = uuidv4();
    setUserId(userId);
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;

    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const handleAnswerChange = (value) => {
    setCurrentQuestion({
      ...currentQuestion,
      answer: value,
    });
  };

  const handleSaveQuestion = () => {
    // Validate if question, options, and answer are filled
    if (
      currentQuestion.question.trim() === "" ||
      currentQuestion.options.some((option) => option.trim() === "") ||
      currentQuestion.answer.trim() === ""
    ) {
      alert("Please fill in the question, options, and answer.");
      return;
    }

    // Save the current question to the array
    setQuestions([...questions, currentQuestion]);

    // Reset the current question after saving
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const handleSaveAllQuestions = async () => {
    // Validate if there are questions to save
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    // Save all questions
    await saveQuestion(groupId, userId, questions);

    // Reset the questions array after saving
    setQuestions([]);

    // navigate
    navigate(`/questionpage/${groupId}/${userId}`)
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Question Form</h2>

        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            className="w-full border p-2 rounded-md"
            placeholder="Enter your question..."
            value={currentQuestion.question}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                question: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Options:
          </label>
          {currentQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="w-full border p-2 rounded-md mb-2"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Answer:
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-md mb-2"
            placeholder="Enter the answer..."
            value={currentQuestion.answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>

        <button
          className="mr-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSaveQuestion}
        >
          Save Question
        </button>

        {questions.length > 0 && (
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            onClick={handleSaveAllQuestions}
          >
            Save All Questions
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
