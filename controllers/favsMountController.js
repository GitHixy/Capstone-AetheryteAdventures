const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addMountToFavourites = async (req, res) => {
    const { mountId } = req.body;
    const userId = req.params.userId;

    if (!userId || !mountId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and mountId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { mounts: mountId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.mounts,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add mount to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeMountFromFavourites = async (req, res) => {
  const { mountId } = req.body;
  const userId = req.params.userId;

  if (!userId || !mountId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and mountId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { mounts: mountId } },
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
          payload: favourites.mounts,
          message: "mount removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove mount from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addMountToFavourites, removeMountFromFavourites};