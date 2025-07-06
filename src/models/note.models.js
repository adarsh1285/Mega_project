import mongoose, {Schema} from "mongoose";

const projectNoteSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        require: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
}, {timestamps: true});

export const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema)