"use strict";

let User = require("../models/user");

let controller = {
  //Guardar un usuario
  save: (req, res) => {
    let params = req.body;

    let user = new User();

    user.document = params.document;
    user.name = params.name;
    user.lastName = params.lastName;
    user.cellphone = params.cellphone;
    user.email = params.email;
    user.country = params.country;
    user.region = params.region;
    user.city = params.city;
    user.address = params.address;

    user.save((err, userStored) => {
      if (err || !userStored) {
        return res.status(404).send({
          status: "error",
          messsage: "El usuario no se ha guardado: " + err,
        });
      }

      return res.status(200).send({
        status: "success",
        userStored,
      });
    });
  },

  //Listar  un usuario por el email
  getUserByEmail: (req, res) => {
    let userEmail = req.body.email;

    User.findOne({ email: userEmail }, (err, getUser) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al buscar el usuario",
        });
      }

      if (!getUser) {
        return res
          .status(404)
          .send({ status: "error", message: "No se encontró el usuario" });
      }

      return res.status(200).send({ status: "success", user: getUser });
    });
  },
};

module.exports = controller;
