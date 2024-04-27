const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addTitleToFavourites = async (req, res) => {
    const { titleId } = req.body;
    const userId = req.params.userId;

    if (!userId || !titleId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and titleId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { titles: titleId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites.titles,
            message: 'Element added successfully'
        });
    } catch (e) {
        console.error("Failed to add title to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

const removeTitleFromFavourites = async (req, res) => {
  const { titleId } = req.body;
  const userId = req.params.userId;

  if (!userId || !titleId) {
      return res.status(400).send({
          statusCode: 400,
          message: "userId and titleId are required and must be valid."
      });
  }

  try {
      const favourites = await Favourites.findOneAndUpdate(
          { userId: userId },
          { $pull: { titles: titleId } },
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
          payload: favourites.titles,
          message: "title removed from favourites successfully."
      });
  } catch (e) {
      console.error("Failed to remove title from favourites:", e);
      res.status(500).send({
          statusCode: 500,
          message: "Internal server error"
      });
  }
};

module.exports = {addTitleToFavourites, removeTitleFromFavourites};