import axios from "axios";
import { useId } from "react";

export const generateLink = async (groupName) => {
  try {
    const data = await axios.post(
      import.meta.env.VITE_BASE_URL + "/quiz/generatelink",
      {
        groupName,
      }
    );
    const groupId = data?.data?.groupId;
    return groupId;
  } catch (error) {
    console.log(error);
  }
};

export const saveQuestion = async (groupId, userId, questionArray) => {
  try {
    const data = await axios.post(
      import.meta.env.VITE_BASE_URL + "/quiz/savequestion",
      { groupId, userId, questionArray }
    );

    const response = data?.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (groupId, userId) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/quiz/getquestion?groupId=${groupId}&userId=${userId}`
    );
    const res = data?.data;
   return res;
  } catch (error) {
    console.log(error);
  }
};
