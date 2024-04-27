const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addMinionToFavourites = async (req, res) => {
    const { minionId } = req.body;
    const userId = req.params.userId;

    if (!userId || !minionId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and minionId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { minions: minionId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.minions,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add minion to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeMinionFromFavourites = async (req, res) => {
  const { minionId } = req.body;
  const userId = req.params.userId;

  if (!userId || !minionId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and minionId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { minions: minionId } },
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
          payload: favourites.minions,
          message: "minion removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove minion from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addMinionToFavourites, removeMinionFromFavourites};