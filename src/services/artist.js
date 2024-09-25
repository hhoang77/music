import ArtistModel from "../models/artist.js";

const getAllArtist = async () => {
  try {
    return await ArtistModel.find();
  } catch (error) {
    console.log(error);
  }
};

const getArtistById = async (id) => {
  try {
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      throw Error("Artist Not Found");
    }
    return artist;
  } catch (error) {
    console.log(error);
  }
};

const createArtist = async ({ name, avarta, gender, bio }) => {
  try {
    const artist = await ArtistModel.findOne({ name });
    if (artist) {
      throw Error("Artist is already");
    }
    return await ArtistModel.create({
      name,
      avarta,
      gender,
      bio,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateArtist = async (id, { name, avarta, gender, bio }) => {
  try {
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      throw Error("Artist Not Found");
    }
    return await ArtistModel.findByIdAndUpdate(
      id,
      { name, avarta, gender, bio },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteArtist = async (id) => {
  try {
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      throw Error("Artist Not Found");
    }
    return await ArtistModel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

export const artistServices = {
  getAllArtist,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};
