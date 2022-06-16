const { Users } = require("./schemas/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("..//helpers/env");
const { createError } = require("../helpers/errors");

const registration = async (email, password) => {
  const result = await Users.findOne({ email: email });
  if (result) {
    return;
  }
  const pass = password;
  const hashedPassword = await bcrypt.hash(pass, 10);
  const user = await Users.create({ email, password: hashedPassword });
  return user;
};

const login = async ({ email, password }) => {
  const user = await Users.findOne({ email: email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    role: user.subscription,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.findByIdAndUpdate(user.id, { token });
  return token;
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    return await Users.findById(id);
  } catch (e) {
    return null;
  }
};

const logout = async (id) => {
  try {
    const user = await Users.findByIdAndUpdate(id, {token:null});

  } catch (e) {
    return null;
  }
};

const current = async (contactId, fields) => {
  return Users.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  authenticateUser,
};