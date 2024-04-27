const Favourites = require("../models/FavouritesSchema");

const getFavouritesByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send({
            message: "UserId is required."
        });
    }

    try {
        const favourites = await Favourites.findOne({ userId }).exec();
        if (!favourites) {
            return res.status(404).send({
                message: "Favourites not found for this user."
            });
        }
        res.status(200).send(favourites);
    } catch (error) {
        console.error("Error fetching favourites:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getFavouritesByUserId
};
