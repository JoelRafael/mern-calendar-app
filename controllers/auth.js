const { response } = require("express");
const bcrypt = require("bcryptjs");
const { defaultSucces, defaulMessage } = require("../helpers/script");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const creatUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user)
      return defaulMessage(res, "Un usuario existe con ese correo", 400);

    user = new User(req.body);

    // Encryptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    //General JWT
    const token = await generateJWT(user._id, user.name);
    const data = {
      uid: user._id,
      name: user.name,
      token,
    };

    return defaultSucces(res, data, "Usuario creado con exito", 201);
  } catch (error) {
    return defaulMessage(res, "Por favor hable con el administrador", 500);
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return defaulMessage(res, "El usuario no existe con ese email", 400);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return defaulMessage(res, "El password no es correcto", 400);
    }
    //General we JWT
    const token = await generateJWT(user._id, user.name);

    const data = {
      uid: user._id,
      name: user.name,
      token,
    };

    return defaultSucces(res, data, "User login with exit", 200);
  } catch (error) {
    return defaulMessage(res, "Por favor hable con el administrador", 500);
  }
};

const renewToken = async (req, res = response) => {
  //renew token
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  return defaultSucces(res, token, "Renew Token with exito", 200);
};

module.exports = {
  creatUser,
  login,
  renewToken,
};
