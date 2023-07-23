"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getWatchLater = async (request, response) => {

    const { userId } = request.params;

    if(!userId){
        return response.status(400).json({status: 400, message: "No id provided"})
    }

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();
        const db = client.db("Shuffle");

        const resultGetOne = await db.collection("watchLater").findOne({ _id: userId });
        console.log(resultGetOne)

        resultGetOne
        ? response.status(200).json({ status: 200, data: resultGetOne})
        : response.status(404).json({ status: 404, data: "Not Found" });

    } catch (err) {
        (err) => console.log(err);
    } finally {
        client.close();
    }
};

module.exports = { getWatchLater };