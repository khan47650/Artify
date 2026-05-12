const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("../utils/cloudinary");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generatePlainPassword = () => {
  return Math.random().toString(36).slice(-8) + Math.floor(1000 + Math.random() * 9000);
};

exports.signup = async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      artistPhoto,
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (role === "seller" && !artistPhoto) {
      return res.status(400).json({ message: "Artist picture is required for seller" });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {

      // buyer already exists
      if (existingUser.role === "buyer" && role === "seller") {
        return res.status(409).json({
          message: "This email is already registered as buyer. Please use another email for seller account.",
        });
      }

      // seller already exists
      if (existingUser.role === "seller" && role === "buyer") {
        return res.status(409).json({
          message: "This email is already registered as seller. Please use another email for buyer account.",
        });
      }

      // same role already exists
      return res.status(409).json({
        message: `This email is already registered as ${existingUser.role}`,
      });
    }

    let uploadedArtistPhoto = "";

    if (role === "seller" && artistPhoto) {
      const uploadedResponse = await cloudinary.uploader.upload(artistPhoto, {
        folder: "artify-artists",
      });

      uploadedArtistPhoto = uploadedResponse.secure_url;
    }

    if (role === "seller" && !uploadedArtistPhoto) {
      return res.status(400).json({
        message: "Artist image upload failed",
      });
    }
    const user = await User.create({
      role,
      firstName,
      lastName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      artistPhoto: uploadedArtistPhoto,
      email: normalizedEmail,
      password,
    });

    await sendEmail(
      normalizedEmail,
      "Welcome to Artify",
      `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:28px;">
          <h1 style="color:#111;">Welcome to Artify 🎨</h1>
          <p>Hi ${firstName || "there"},</p>
          <p>Your Artify account has been created successfully.</p>
          <p>You can now discover, collect, and sell digital artworks on Artify.</p>
          <p style="margin-top:24px;">Regards,<br/><strong>Artify Team</strong></p>
        </div>
      </div>
      `
    );

    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `This account is registered as ${user.role}` });
    }


    await sendEmail(
      normalizedEmail,
      "New Login on Artify",
      `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:28px;">
          <h1 style="color:#111;">Login Alert</h1>
          <p>Hi ${user.firstName || "there"},</p>
          <p>Your account was just logged in on <strong>Artify</strong>.</p>
          <p>If this was you, no action is needed.</p>
          <p>If this was not you, please change your password immediately.</p>
          <p style="margin-top:24px;">Regards,<br/><strong>Artify Team</strong></p>
        </div>
      </div>
      `
    );

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const newPassword = generatePlainPassword();

    user.password = newPassword;
    await user.save();

    const emailSent = await sendEmail(
      normalizedEmail,
      "Your New Artify Password",
      `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:28px;">
          <h1 style="color:#111;">Password Reset</h1>
          <p>Hi ${user.firstName || "there"},</p>
          <p>Your Artify password has been reset successfully.</p>
          <p>Your new password is:</p>
          <div style="font-size:22px;font-weight:bold;background:#f1f1f1;padding:14px;border-radius:10px;text-align:center;letter-spacing:1px;">
            ${newPassword}
          </div>
          <p>Please login using this password.</p>
          <p style="margin-top:24px;">Regards,<br/><strong>Artify Team</strong></p>
        </div>
      </div>
      `
    );

    if (!emailSent) {
      return res.status(500).json({ message: "Password updated but email could not be sent" });
    }

    res.json({ message: "New password has been sent to your registered email" });
  } catch (error) {
    res.status(500).json({ message: "Forgot password failed", error: error.message });
  }
};