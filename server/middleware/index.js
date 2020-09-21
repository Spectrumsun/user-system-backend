import jwt from 'jsonwebtoken';
import models from "../database/models";
import env from '../config/environment';

class Auth {
  static verifyToken(req, res, next) {
    const token = req.body.token ||
    req.query.token || req.headers.authorization;
    if (token) {
      const secret = env.SECRET;
      jwt.verify(token, secret, (err, data) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed',
          });
        }
        req.user = data;
        next();
      });
    } else {
      return res.status(403).json({
        message: 'You need to sign up or sign in',
      });
    }
  }

  static async validateAdmin(req, res, next) {
    const user = await models.User.findOne({ where: req.user.id });
    if (user.role !== 'Admin') {
      return res.status(400).json({
        status: 'Failed',
        message: 'You have to be an Admin to do that'
      });
    }
    next();
  };

  static async checkUserExist(req, res, next) {
    const { email } = req.body;
    const UserExist = await models.User.findOne({ where: { email}});
    if(UserExist) {
      return res.status(400).json({ 
        status: 'Failed',
        message: 'An account with that email already exist'
      })
    }
    next();
  }
};

export default Auth;