import mongoose from "mongoose";
import { Itweet } from "../types/types";
import { string } from "yup";
import User from "./user";



const Schema = mongoose.Schema;
mongoose.set('bufferCommands', false);

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  retweets: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post', // Reference to another Post (Tweet or Comment)
  },
}, { timestamps: true });

// const Post = mongoose.model('Post', postSchema);

const Post = mongoose.models.Post || mongoose.model<Itweet>("Post", postSchema);

export default Post
