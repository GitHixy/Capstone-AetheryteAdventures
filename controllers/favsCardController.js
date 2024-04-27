const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addCardToFavourites = async (req, res) => {
    const { cardId } = req.body;
    const userId = req.params.userId;

    if (!userId || !cardId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and cardId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { triadCards: cardId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.triadCards,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add card to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeCardFromFavourites = async (req, res) => {
  const { cardId } = req.body;
  const userId = req.params.userId;

  if (!userId || !cardId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and cardId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { triadCards: cardId } },
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
          payload: favourites.triadCards,
          message: "card removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove card from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addCardToFavourites, removeCardFromFavourites};