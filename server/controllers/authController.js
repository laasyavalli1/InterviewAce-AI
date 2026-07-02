const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    "262003875798-snn0csvjf3nq95n8uohot76npm5qvped.apps.googleusercontent.com"
);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }

        let user = await User.findOne({

            email

        });

        if (user) {

            return res.status(400).json({

                message: "User already exists"

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(

            password,

            salt

        );

        user = await User.create({

            name,

            email,

            password: hashedPassword

        });

        res.status(201).json({

            _id: user._id,

            name: user.name,

            email: user.email,

            token: generateToken(user._id)

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error",

            error: error.message

        });

    }

};
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(400).json({

                message: "Invalid credentials"

            });

        }

        if (!user.password) {

            return res.status(400).json({

                message: "Please login with Google."

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid credentials"

            });

        }

        res.json({

            _id: user._id,

            name: user.name,

            email: user.email,

            token: generateToken(user._id)

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error",

            error: error.message

        });

    }

};
exports.googleLogin = async (req, res) => {

    try {

        const { credential } = req.body;

        const ticket = await client.verifyIdToken({

            idToken: credential,

            audience: "262003875798-snn0csvjf3nq95n8uohot76npm5qvped.apps.googleusercontent.com"

        });

        const payload = ticket.getPayload();

        const {

            email,

            name

        } = payload;

        let user = await User.findOne({

            email

        });

        if (!user) {

            user = await User.create({

                name,

                email,

                password: null

            });

        }

        res.json({

            _id: user._id,

            name: user.name,

            email: user.email,

            token: generateToken(user._id)

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user._id
        ).select('-password');

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });

    }
};