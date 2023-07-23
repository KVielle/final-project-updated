"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const getUserRating = async (request, response) => {
    const { userId, movieId } = request.params;
    
    if (!userId || !movieId) {
        return response
            .status(400)
            .json({ status: 400, message: "Missing required parameters" });
        }
        
    const client = new MongoClient(MONGO_URI, options);
        
    try {
        await client.connect();
        const db = client.db("Shuffle");
        
        const watchLaterCollection = db.collection("watchLater");
        
      // Find the document with the matching userId
        const watchLater = await watchLaterCollection.findOne({ _id: userId });
        
        if (!watchLater) {
        return response
            .status(404)
            .json({ status: 404, message: "User watchLater not found" });
        }
        
      // Find the item in the listItems array with the matching movieId
        const movieItem = watchLater.listItems.find((item) => item._id === movieId);
        
        if (!movieItem) {
            return response
            .status(404)
            .json({ status: 404, message: "Movie not found in watchLater list" });
        }
        
        const userRating = movieItem.userRating || 0;
        
        response.status(200).json({ status: 200, userRating });
        } catch (err) {
        console.error(err);
        response.status(500).json({ status: 500, message: "Server error" });
        } finally {
            client.close();
        }
    };

module.exports = { getUserRating };