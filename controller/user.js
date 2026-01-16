const User = require("../model/user");
const { createTokenForUser } = require("../services/authenticate")

const handleGetSignup = async (req, res) => {
    return res.render("signup")
}

const handleGetSignin = async (req, res) => {
    return res.render("signin")
}

const handlePostSignup = async (req, res) => {
    try {
        const { first_name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", {
                error: "User with this email already exists",
                old: { first_name, email }
            });
        }

        await User.create({ first_name, email, password });
        return res.redirect("/");

    } catch (error) {
        console.error(error);
        return res.render("signup", { error: "Something went wrong" });
    }
};


async function handlePostSignin(req, res) {
    try {
        const { email, password } = req.body;

        // 1️⃣ check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
            //or 
            // return res.status(400).render("signin", { error: "User does not exist" });
        }

        // 2️⃣ compare password using schema method
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            // return res.status(400).send("Invalid email or password");
            //or 
            return res.status(400).render("signin", { error: "Invalid email or password" });
        }

        const token = createTokenForUser(user);
        console.log(token);
        // return token;
        // ✅ 5️⃣ redirect (VERY IMPORTANT)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true, // REQUIRED in production
        })
        return res.redirect("/")
        // res.cookie("token", token).send("Login successful ✅");
        //or
        // res.status(200).cookie("token", token).render("home", { success: "Login successful ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
}

const handleLogout = async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/")
}

module.exports = { handleGetSignup, handleGetSignin, handlePostSignup, handlePostSignin, handleLogout }