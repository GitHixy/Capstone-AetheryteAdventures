const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addFashionToFavourites = async (req, res) => {
    const { fashionId } = req.body;
    const userId = req.params.userId;

    if (!userId || !fashionId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and fashionId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { fashionAccessories: fashionId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.fashionAccessories,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add fashion to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeFashionFromFavourites = async (req, res) => {
  const { fashionId } = req.body;
  const userId = req.params.userId;

  if (!userId || !fashionId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and fashionId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { fashionAccessories: fashionId } },
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
          payload: favourites.fashionAccessories,
          message: "fashion removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove fashion from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addFashionToFavourites, removeFashionFromFavourites};