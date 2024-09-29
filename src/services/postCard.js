import PostCardModel from "../models/postcard.js";

const getAllPostCard = async () => {
  return await PostCardModel.find();
};

const createPostCard = async ({
  title,
  artistId,
  genreId,
  content,
  image,
  audio,
}) => {
  try {
    return await PostCardModel.create({
      title,
      artistId,
      genreId,
      content,
      image,
      audio,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePostCard = async (
  id,
  { title, artistId, genreId, content, image, audio }
) => {
  try {
    const postCard = await PostCardModel.findById(id);
    if (!postCard) {
      throw Error(" PostCard Not Found ");
    }
    return await PostCardModel.findByIdAndUpdate(
      id,
      {
        title,
        artistId,
        genreId,
        content,
        image,
        audio,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const deletePostCard = async (id) => {
  try {
    const postCard = await PostCardModel.findById(id);
    if (!postCard) {
      throw Error(" PostCard Not Found ");
    }
    return await PostCardModel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

export const postCardServices = {
  getAllPostCard,
  createPostCard,
  updatePostCard,
  deletePostCard,
};
