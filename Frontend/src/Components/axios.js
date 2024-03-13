import axios from "axios";

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
