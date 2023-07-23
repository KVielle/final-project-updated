"use strict";
//this is the latest version
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//encrypting function
const hashAPassword = async (incomingPassword) => {
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return hashedPassword;
};

const SignUp = async (request, response) => {
    const { email, password, firstName } =
    request.body;


    if (
        !email ||
        !firstName ||
        !password 
        


    ) {
    return response.status(400).json({
        status: 400,
        data: {
            email: email || "Missing email",
            password: password || "Missing password",
            firstName: firstName || "Missing first name",

        },
    });
    }

    const client = new MongoClient(MONGO_URI, options);

    try {
    await client.connect();
    const db = client.db("Shuffle");

    //checking if there is already any auth with this email
    const resultDuplicateAuth = await db
        .collection("auth")
        .findOne({ _id: email.toLowerCase() });
    if (resultDuplicateAuth) {
        return response
        .status(409)
        .json({ status: 409, message: `Email already in use` });
    }

    //encrypting the the given password
    const encryptedPassword = await hashAPassword(password);
    const authData = { _id: email.toLowerCase(), password: encryptedPassword };

    //adding an authentication object
    const resultAddAuth = await db.collection("auth").insertOne(authData);
    !resultAddAuth &&
        response
        .status(400)
        .json({ status: 400, message: "Bad request", data: authData });

    // generating unique userID
    let userId = uuidv4();
    let isDuplicate = await db.collection("users").findOne({ userId: userId });
    while (isDuplicate) {
        userId = uuidv4();
        isDuplicate = await db.collection("users").findOne({ userId: userId });
    }

    //checking if user object already exist
    const resultDuplicateUser = await db
        .collection("users")
        .findOne({ _id: email.toLowerCase() });
    if (resultDuplicateUser) {
        return response
        .status(409)
        .json({ status: 409, message: `Email already in use` });
    }

    const userData = {
        _id: email.toLowerCase(),
        email: email.toLowerCase(),
        firstName: firstName,
        userId: userId




    };

    //creating a new user
    const resultAddUser = await db.collection("users").insertOne(userData);
    !resultAddUser &&
        response
        .status(400)
        .json({ status: 400, message: "Bad request", data: userData });

    const UserData = { _id: userId, listItems: [] };
    const resultAddId = await db.collection("watchLater").insertOne(UserData);
    !resultAddId &&
        response
            .status(400)
            .json({ status: 400, message: "Bad request", data: UserData });

    response
        .status(201)
        .json({ status: 201, message: "Account successfully created" });
    } catch (err) {
    (err) => console.log(err);
    response.status(500).json({ status: 500, message: "Server error" });
    } finally {
    client.close();
    }
};

module.exports = { SignUp };