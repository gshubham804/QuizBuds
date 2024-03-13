import Question from "../models/Questions.models.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Group from "../models/Group.models.js";
dotenv.config({ path: "../config.env" });

// generate the link

export const generateLink = async (req, res, next) => {
  try {
    // first generate a randow id using v4 as a groupID and then save the groupName
    //  and groupId in group model but before this check same groupName will not be present

    const groupId = uuidv4();

    const { groupName } = req.body;

    // Check if the groupName is unique
    const existingGroup = await Group.findOne({ groupName });

    if (existingGroup) {
      return res.status(400).json({
        message: "Group name already exists. Choose a different name.",
      });
    }

    const group = new Group({ groupName, groupId });
    await group.save();

    // Return the generated link or any other information you want to provide
    res.status(201).json({ groupId, groupName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// save the question

export const saveQuestion = async (req, res, next) => {
  try {
    // before save the question check whether groupId is present or not

    const { groupId, userId, questionText, answer } = req.body;
    // Check if groupId is present and valid
    if (!groupId) {
      return res.status(400).json({ message: "groupId is required." });
    }

    // Check if the group with the provided groupId exists
    const groupExists = await Group.exists({ groupId });

    if (!groupExists) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Assuming you have a Question model with appropriate fields
    const question = new Question({ groupId, userId, questionText, answer });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// get the question

export const getQuestion = async (req, res, next) => {
  try {
    // get the groupId and userID from params(URL)
    const { groupId, userId } = req.query;

    // Check if groupId and userId exist
    if (!groupId || !userId) {
      return res
        .status(400)
        .json({
          message: "groupId and userId are required in the URL parameters.",
        });
    }

     // Check if groupId and userId exist in the database
     const groupExists = await Question.exists({ groupId });
     const userExists = await Question.exists({ userId });
 
     if (!groupExists || !userExists) {
       return res.status(404).json({ message: "Group or user not found." });
     }

    // return the only those questions who belong to that group and not related the this userID
    const questions = await Question.find({ groupId, userId: { $ne: userId } });

    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
