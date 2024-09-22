import mongoose from "mongoose";

const Genre = mongoose.Schema({
  name: {
    type: String,
  },
  decription: {
    type: String,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },
});

const GenreModel = mongoose.model("Genre", Genre);
export default GenreModel;
