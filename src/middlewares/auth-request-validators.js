const validateAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'Email or password in the sign request',
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    res.status(404).json({
      success: false,
      data: {},
      err: 'User id is required',
      message: 'something went wrong',
    });
  }
  next();
};
module.exports = { validateAuth, validateIsAdminRequest };
