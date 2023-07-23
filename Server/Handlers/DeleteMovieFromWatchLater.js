"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteMovieFromWatchLater = async (request, response) => {
    const { userId } = request.params;
    const { movieId } = request.body;

    console.log("user ID:", userId);
    console.log("movie ID:", movieId);

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("Shuffle");
        const collection = db.collection("watchLater");

    const result = await collection.findOne({ _id: userId });

        if (!result) {
        response.status(404).json({ status: 404, message: "Movie not found" });
        return;
    }

    const listItems = result.listItems;
    const itemIndex = listItems.findIndex(
        (item) => String(item._id).trim() === String(movieId).trim()
    );

    if (itemIndex === -1) {
        response
            .status(404)
            .json({ status: 404, message: "Movie not found in list" });
        return;
    }

    listItems.splice(itemIndex, 1);

    await collection.updateOne(
        { _id: userId },
        { $set: { listItems } } 
    );

    response
        .status(200)
        .json({ status: 200, message: "Movie deleted from list", listItems });
    } catch (err) {
        console.log(err);
        response.status(500).json({ status: 500, error: "Internal Server Error" });
    } finally {
        client.close();
    }
};

module.exports = { deleteMovieFromWatchLater };