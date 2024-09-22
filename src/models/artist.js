import mongoose from "mongoose";

const Artist = mongoose.Schema({
  name: {
    type: String,
  },
  avarta: {
    type: String,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const ArtistModel = mongoose.model("Artist", Artist);
export default ArtistModel;
