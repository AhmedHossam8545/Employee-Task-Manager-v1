function validateEmployee(req, res, next) {
  const { name, email, position } = req.body;

  if (!name || !email ) {
    return res.status(400).json({
      message: 'Missing required fields: name, email'
    });
  }

  next(); 
}

module.exports = validateEmployee;
