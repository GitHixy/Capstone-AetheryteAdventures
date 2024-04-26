const Favourites = require("../models/FavouritesSchema");
const UserModel = require("../models/UserModel");
const axios = require("axios");

const addAchievementToFavourites = async (req, res) => {
    const { achievementId } = req.body;
    const userId = req.params.userId;

    if (!userId || !achievementId) {
        return res.status(400).send({
          statusCode: 400,
          message: "userId and achievementId are required and must be valid."
        });
      }
      try {
        const favourites = await Favourites.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { achievements: achievementId } }, 
            { new: true, upsert: true } 
        );
        await UserModel.findByIdAndUpdate(userId, {
          $set: { favourites: favourites._id },
        });
        res.status(201).send({
            statusCode: 201,
            payload: favourites,
        });
    } catch (e) {
        console.error("Failed to add achievement to favourites:", e);
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
};

module.exports = {addAchievementToFavourites};