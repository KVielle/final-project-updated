"use strict";
//latest version tested and working
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addTvShowToWatchLater = async (request, response) => {
  //_id is the  id
  //qty is the amount of items chosen by the user in the FE
    const { _id, name, vote_average, overview, poster_path } = request.body;

  //get the user Id from the local storage on the FE
    const { userId } = request.params;
    
    if (!userId) {
        return response
        .status(400)
        .json({ status: 400, message: "Missing user id" });
    }
    if (!_id || !name || !vote_average || !overview || !poster_path) {
        return response
        .status(400)
        .json({ status: 400, message: "Missing show data" });
    }

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("Shuffle");

        //getting the array of items from the user`s list
        const WishListData = await db.collection("watchLater").findOne({ _id: userId });
    
        if (!WishListData) {
            return response.status(404).json({
                status: 404,
                message: "User watchlist not found",
            });
        }

    const itemsArray = WishListData.listItems;

    const containsItem = itemsArray.some((item) => item._id === _id);
    

    if (!containsItem) {
        const showData = { _id, name, vote_average, overview, poster_path };

        itemsArray.push(showData);

        await db.collection("watchLater").updateOne(
            { _id: userId },
            { $set: { listItems: itemsArray } }
        );

        return response.status(200).json({
            status: 200,
            message: "Item added to the watchlist",
        });
        } else {
        return response
            .status(409)
            .json({ status: 409, message: "Item already in the watchlist" });
        }
    } catch (err) {
        console.error(err);
        response.status(500).json({ status: 500, message: "Server error" });
    } finally {
        client.close();
    }
}
    

module.exports = { addTvShowToWatchLater };