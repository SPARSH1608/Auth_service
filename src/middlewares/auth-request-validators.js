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
module.exports = { validateAuth };
