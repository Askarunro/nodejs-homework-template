const { registration, login, logout, current } = require("../service/auth");
const { User, schemaRegister } = require("../service/schemas/users");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await registration(email, password);
    if (result && schemaRegister.validate(email, password)) {
      return res.json({
        status: "created",
        code: 201,
        data: { user: result },
      });
    }
    return res.json({
      status: "conflict",
      code: 409,
      message: `Email in use`,
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, subscription = "starter" } = req.body;
  const result = await login(req.body);
  if (!result) {
    return res.json({
      status: "unauthorized",
      code: 401,
      message: `Email or password is wrong`,
    });
  }
  return res.json({
    status: "success",
    code: 200,
    token: result,
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

const logoutUser = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.sendStatus(204)
  } catch (e) {
    next(e);
  }
};

const currentUser = async () => {};

module.exports = { registerUser, loginUser, logoutUser, currentUser };
