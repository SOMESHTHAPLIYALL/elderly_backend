const UserModel = require("../models/UserModel");
const GuardianModel = require("../models/GuardianModel");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exist",
        success: false,
      });
    }

    const user = new UserModel({ name, email, password });
    await user.save();
    return res.status(200).send({
      message: "Succesfully registered",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide all fields",
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }

    if (password != user.password) {
      return res.status(400).send({
        message: "Password Incorrect",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User found successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.singleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id).populate("guardian");
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "User successfully fetched",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.newGuardian = async (req, res) => {
  try {
    const { name, email, relation, phone, id } = req.body;
    const newGuardian = new GuardianModel({
      name: name,
      email: email,
      relation: relation,
      phone: phone,
    });

    await newGuardian.save();
    const user = await UserModel.findById(id);

    user.guardian.push(newGuardian);
    await user.save();

    return res.status(200).send({
      messagee: "Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.delGuardian = async (req, res) => {
  try {
    const { id } = req.body;

    const guardian = await GuardianModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Success",
      success: true,
      guardian,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};
