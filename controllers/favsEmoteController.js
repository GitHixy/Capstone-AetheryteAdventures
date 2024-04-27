const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addEmoteToFavourites = async (req, res) => {
    const { emoteId } = req.body;
    const userId = req.params.userId;

    if (!userId || !emoteId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and emoteId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { emotes: emoteId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.emotes,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add emote to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeEmoteFromFavourites = async (req, res) => {
  const { emoteId } = req.body;
  const userId = req.params.userId;

  if (!userId || !emoteId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and emoteId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { emotes: emoteId } },
          { new: true }
      );

      if (!favourites) {
          return res.status(404).send({
              statusCode: 404,
              message: "User not found or no favourites list exists."
          });
      }

      res.status(200).send({
          statusCode: 200,
          payload: favourites.emotes,
          message: "emote removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove emote from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addEmoteToFavourites, removeEmoteFromFavourites};