import mongoose from "mongoose";

const PostCard = mongoose.Schema({
  title: {
    type: String,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  image: {
    type: String,
  },
  content: {
    type: String,
  },
  audio: {
    type: String,
  },
});

const PostCardModel = mongoose.model("PostCard", PostCard);

export default PostCardModel;
