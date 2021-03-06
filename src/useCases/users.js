const bycript = require("../lib/bcrypt");
const jwt = require("../lib/jwt");
const User = require("../models/users");

function getUser(userId) {
  return User.findById(userId)
    .populate("articles", {
      name: 1,
      price: 1,
      description: 1,
    })
    .populate("favorites", {
      name: 1,
      price: 1,
      description: 1,
    })
    .sort({ createdAt: "desc" });
}

function getAllUsers() {
  return User.find({})
    .populate("articles", {
      name: 1,
      price: 1,
      description: 1,
    })
    .populate("favorites", {
      name: 1,
      price: 1,
      description: 1,
    })
    .sort({ createdAt: "desc" });
}

async function signUp(dataUser) {
  const { name, lastname, city, state, number, email, password } = dataUser;
  const userFound = await User.findOne({ email });

  if (userFound) throw new Error("This user already exists");
  const passwordEncrypted = await bycript.hash(password);

  return User.create({
    name,
    lastname,
    city,
    state,
    number,
    email,
    password: passwordEncrypted,
  });
}

async function login(email, password) {
  const userFound = await User.findOne({ email });
  if (!userFound) throw new Error("The email not found");

  const validPassword = await bycript.compare(password, userFound.password);
  if (!validPassword) throw new Error("The password is incorrect");

  return jwt.sign({ id: userFound._id, username: userFound.name });
}

function updateUser(userId, dataUser) {
  return User.findByIdAndUpdate(userId, dataUser, { new: true });
}

function deleteUser(userId) {
  return User.findByIdAndDelete(userId);
}

module.exports = {
  getAllUsers,
  getUser,
  signUp,
  login,
  updateUser,
  deleteUser,
};
