import GenreModel from "../models/genre.js";

const getAllGenre = async () => {
  try {
    return await GenreModel.find();
  } catch (error) {
    console.log(error);
  }
};

const getGenreById = async (id) => {
  try {
    const genre = await GenreModel.findById(id);
    if (!genre) {
      throw Error("Genre Not Found");
    }
    return genre;
  } catch (error) {
    console.log(error);
  }
};

const createGenre = async ({ name, image, decription, slug }) => {
  try {
    const genre = await GenreModel.findOne({ name });
    if (genre) {
      throw Error("Genre is already");
    }
    return await GenreModel.create({ name, image, decription, slug });
  } catch (error) {
    console.log(error);
  }
};

const updateGenre = async (id, { name, image, decription, slug }) => {
  try {
    const genre = await GenreModel.findById(id);
    if (!genre) {
      throw Error("Genre Not Found");
    }
    return await GenreModel.findByIdAndUpdate(
      id,
      { name, image, decription },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteGenre = async (id) => {
  try {
    const genre = await GenreModel.findById(id);
    if (!genre) {
      throw Error("Genre Not Found");
    }
    return await GenreModel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

export const genreServices = {
  getAllGenre,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
