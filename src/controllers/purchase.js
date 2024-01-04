"use strict";

let Purchase = require("../models/purchase");

let controller = {
  //Guardar una compra
  save: (req, res) => {
    let params = req.body;

    let purchase = new Purchase();

    purchase.user_id = params.user_id;
    purchase.products = params.products;

    purchase.save((err, purchaseStored) => {
      if (err || !purchaseStored) {
        return res
          .status(404)
          .send({ status: "error", messsage: "El compra no se ha guardado" });
      }

      return res.status(200).send({
        status: "success",
        purchaseStored,
      });
    });
  },

  //obtener compra por el id del usuario
  getByUserId: (req, res) => {
    let user_id = req.body.user_id;

    Purchase.find({ user_id: user_id }, (err, purchase) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al traer la compra: " + err,
        });
      }

      if (!purchase) {
        return res.status(404).send({
          status: "error",
          messsage: "No se encontro ninguna compra: " + err,
        });
      }

      return res.status(200).send({ status: "success", purchase });
    });
  },
};

module.exports = controller;
