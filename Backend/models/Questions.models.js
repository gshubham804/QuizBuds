import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    groupId:{
        type:String,
        required:true,
    },
    questionText:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    }
});

const Question = new mongoose.model("Question", QuestionSchema);
export default Question;
