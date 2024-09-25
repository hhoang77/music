import mongoose from "mongoose";

const Song = mongoose.Schema({
  name: {
    type: String,
  },
  soundQuantity: {
    type: Number,
    enum: [128, 320],
    default: 128,
  },
  image: {
    type: String,
  },
  audio: {
    type: String,
  },
  lyrics: {
    type: String,
  },
  playCount: {
    type: Number,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
});

const SongModel = mongoose.model("Song", Song);
export default SongModel;
