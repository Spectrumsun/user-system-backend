import models from "../database/models";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import env from '../config/environment';

class User {
  static welcome(req, res) {
    res.status(200).json({ message: "Welcome to User system" });
  }

  static async signUp(req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const { id, email, role } = await models.User.create({...req.body, password: hashPassword})
    const token = User.generateToken( id, email, role );
    return User.handleResponse(
      res, 
      201, 
      'Success', 
      'Signup successfully', 
      { email, token }
    );
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const findUser = await models.User.findOne({ where: { email } });
    if(findUser) {
      const verifyPassword = await bcrypt.compare(password, findUser.password);
      if(verifyPassword) {
        const token = User.generateToken(findUser.id, findUser.email, findUser.role);
        return User.handleResponse(res, 200, 'Success', 'Login successfully', { email, token });
      }else {
        return User.handleResponse(res, 400, 'Failed', 'Email or password incorrect', { })
      }
    } else {
      return User.handleResponse(res, 400, 'Failed', 'Email or password incorrect', { });
    }
  }

  static async getUserProfile(req, res) {
    const userDetail = await models.User.findOne({ 
      where : { 
          id: req.user.id
        }, 
      });
    return User.handleResponse(res, 200, 'Success', 'Your details ', { userDetail });  
  }

  static async updateProfile(req, res) {
    const { name, email, firstName, lastName, phoneNumber, age, picture, address, gender } = req.body;
    const [_ , updateProfile] = await models.User.update(
      {
        name, email, firstName, lastName, phoneNumber, age, picture, address,gender
      },
      { 
        where: { id: req.user.id }, 
        returning: true, 
      },
    )

    delete updateProfile[0].password;

    const token = User.generateToken(updateProfile[0].id, updateProfile[0].email, updateProfile[0].role);
    return User.handleResponse(res, 200, 'Success', 'Profile updated', {updateProfile, token})
  }

  static async getAllUsers(req, res) {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] ,  order: '"updatedAt" DESC'   },
    });
    return User.handleResponse(res, 200, 'Success', 'All Users', users)
  }

  static async suspendAccount(req, res) {
    const user = await models.User.update(
      { accountStatus: req.body.accountStatus },
      {
        where: { id: Number(req.params.id) },
        returning: true, 
        order: '"updatedAt" DESC '
    })
    return User.handleResponse(res, 200, 'Success', 'Account status updated',  user)
  } 

  static async updateRole(req, res) {
    const user = await models.User.update(
      { role: req.body.role },
      {
        where: { id: Number(req.params.id) },
        returning: true, 
    })
    return User.handleResponse(res, 200, 'Success', 'Account status updated', user)
  };

  static generateToken (id, email, role) {
    return jwt.sign({
        id, email, role 
      }, env.SECRET, { expiresIn: '200h' });
  }

  static handleResponse(res, statusCode, status, message, data ) {
    return res.status(statusCode).json({
      status,
      message,
      data,
    })
  };
}

export default User;
