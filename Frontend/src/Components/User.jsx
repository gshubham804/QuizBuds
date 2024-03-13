import { useState } from "react";
import { generateLink } from "./axios";

const User = () => {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleButtonClick = async () => {
    const groupId = await generateLink(groupName);
    setGroupId(groupId);
  };

  return (
    <>
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Group Form</h2>

          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Group Name:
            </label>
            <input
              type="text"
              id="input"
              className="w-full border p-2 rounded-md"
              placeholder="Enter group name..."
              value={groupName}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleButtonClick}
          >
            Submit
          </button>
        </div>
      </div>

      {groupId && (
        <div className="text-center">
          <p className=" font-semibold text-xl mt-4 text-green-500">
            Link generated!
          </p>
          <a
            href={`http://localhost:5173/questionform/${groupId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 mt-1"
          >
            https://quiz-buds-psi.vercel.app/questionform/{groupId}
          </a>
        </div>
      )}
    </>
  );
};

export default User;
