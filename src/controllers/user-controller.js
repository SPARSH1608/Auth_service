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
module.exports = {
  create,
};
