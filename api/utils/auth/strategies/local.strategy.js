const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy
({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      return done(boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(boom.unauthorized(), false);
    }
    delete user.dataValues.password;
    return done(null, user.dataValues);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = LocalStrategy;

