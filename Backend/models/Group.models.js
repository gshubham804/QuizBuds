import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        unique:true,
    },
    groupId:{
        type:String,
        required:true,
    },
});

const Group = new mongoose.model("Group", GroupSchema);
export default Group;
