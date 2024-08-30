const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {
  try {
    console.log(req.body);
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      success: true,
      data: response,
      message: 'Successfully created user',
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong ',
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: 'Successfully signed in',
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong ',
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const result = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      data: result,
      message: 'user is authenticated and token is valid',
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong ',
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      success: true,
      data: response,
      message: 'successfully fetched whether user is admin or not',
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong ',
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
