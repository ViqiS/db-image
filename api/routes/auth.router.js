const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {config} = require('./../../config');
const router = express.Router();

router.post('/login',
passport.authenticate('local', {session: false}),
async (req, res, next) => {
  try {
    const user = req.user;
    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.jwtSecret);
    res.json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
}
);

router.get('/bluetooth',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // Aquí puedes colocar la lógica específica de la ruta /bluetooth
      // Solo se ejecutará si el usuario está autenticado correctamente
      res.json({
        message: 'Authorized to access Bluetooth route',
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
