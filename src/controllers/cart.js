"use strict";

let Cart = require("../models/cart");

let controller = {
  //Guardar un carrito
  save: (req, res) => {
    let params = req.body;

    let cart = new Cart();

    cart.user_id = params.user_id;
    cart.createdAt = params.createdAt;
    cart.updatedAt = params.updatedAt;
    cart.products = params.products;

    cart.save((err, cartStored) => {
      if (err || !cartStored) {
        return res
          .status(404)
          .send({ status: "error", messsage: "El carrito no se ha guardado" });
      }

      return res.status(200).send({
        status: "success",
        cartStored,
      });
    });
  },

  getCartbyUserId: (req, res) => {
    let user_id = req.body.user_id;

    Cart.findOne({ user_id: user_id }, (err, getCart) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al traer el carrito: " + err,
        });
      }

      if (!getCart) {
        return res
          .status(404)
          .send({ status: "error", messsage: "No se encontro ningun carrito" });
      }

      return res.status(200).send({ status: "success", getCart });
    });
  },

  updateCart: (req, res) => {
    let params = req.body;

    let updatedFields = {
      products: params.products,
    };

    Cart.findByIdAndUpdate(
      params.cart_id,
      updatedFields,
      { new: true },
      (err, getCart) => {
        if (err) {
          return res.status(500).send({
            status: "Error",
            message: "Error al actualizar el carrito: " + err,
          });
        }

        if (!getCart) {
          return res.status(404).send({
            status: "error",
            messsage: "No se encontroel carrito para actualizar",
          });
        }

        return res.status(200).send({ status: "success", getCart });
      }
    );
  },
};

module.exports = controller;
