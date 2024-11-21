import mongoose from "mongoose";

const Profileschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
      },
      bio: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      profileImg: {
        type: String,
        required: true,
      },

})

 export const Profile = mongoose.model("Profile", Profileschema);