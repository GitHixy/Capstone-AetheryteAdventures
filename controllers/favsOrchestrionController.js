const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addOrchestrionToFavourites = async (req, res) => {
    const { orchestrionId } = req.body;
    const userId = req.params.userId;

    if (!userId || !orchestrionId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and orchestrionId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { orchestrions: orchestrionId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.orchestrions,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add orchestrion to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeOrchestrionFromFavourites = async (req, res) => {
  const { orchestrionId } = req.body;
  const userId = req.params.userId;

  if (!userId || !orchestrionId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and orchestrionId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { orchestrions: orchestrionId } },
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
          payload: favourites.orchestrions,
          message: "orchestrion removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove orchestrion from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addOrchestrionToFavourites, removeOrchestrionFromFavourites};