import SongModel from "../models/song.js";
import ArtistModel from "../models/artist.js"; // Đường dẫn tới file Artist.js
import GenreModel from "../models/genre.js";

const getAllSong = async () => {
  try {
    return await SongModel.find()
      .select("-lyrics")
      .populate("artistId")
      .populate("genreId");
  } catch (error) {
    console.log(error);
  }
};

const getSongById = async (id) => {
  try {
    const song = await SongModel.findById(id);
    if (!song) {
      throw Error("Song Not Found");
    }
    return await SongModel.findById(id);
  } catch (error) {
    console.log(error);
  }
};

const getSongByGenre = async (genre) => {
  try {
    const songs = await SongModel.find()
      .select("-lyrics")
      .populate("artistId")
      .populate("genreId");
    let filteredSongs = [];
    if (
      genre === "nhac-hip-hop" ||
      genre === "nhac-pop" ||
      genre === "nhac-ballad" ||
      genre === "nhac-que-huong"
    ) {
      filteredSongs = songs.filter((item) => item.genreId.slug === genre);
    }
    return filteredSongs;
  } catch (error) {
    console.log(error);
  }
};

const getSongByArtist = async (id) => {
  try {
    const song = await SongModel.find()
      .select("-lyrics")
      .populate("artistId")
      .populate("genreId");
    const songIsArtist = song.filter((item) => {
      return item.artistId._id == id;
    });

    return songIsArtist;
  } catch (error) {
    console.log(error);
  }
};

const searchItem = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  const songResults = await SongModel.find({ name: regex });
  const artistResults = await ArtistModel.find({ name: regex });

  const results = [];
  songResults.forEach((songs) => {
    results.push({
      _id: songs._id,
      name: songs.name,
      image: songs.image,
      type: "song",
    });
  });
  artistResults.forEach((artists) => {
    results.push({
      _id: artists._id,
      name: artists.name,
      image: artists.avarta,
      type: "artist",
    });
  });

  return results;
};

const createSong = async ({
  name,
  image,
  audio,
  lyrics,
  playCount,
  artistId,
  genreId,
}) => {
  try {
    const song = await SongModel.findOne({ name });
    if (song) {
      throw Error("Song is already");
    }
    return await SongModel.create({
      name,
      image,
      audio,
      lyrics,
      playCount,
      artistId,
      genreId,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSong = async (
  id,
  { name, image, audio, lyrics, artistId, genreId }
) => {
  try {
    const song = await SongModel.findById(id);
    if (!song) {
      throw Error("Song Not Found");
    }
    return await SongModel.findByIdAndUpdate(
      id,
      {
        name,
        image,
        audio,
        lyrics,
        playCount,
        artistId,
        genreId,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteSong = async (id) => {
  try {
    const song = await SongModel.findById(id);
    if (!song) {
      throw Error("Song Not Found");
    }
    return await SongModel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

export const songServices = {
  getAllSong,
  getSongById,
  getSongByGenre,
  getSongByArtist,
  searchItem,
  createSong,
  updateSong,
  deleteSong,
};
