"use strict";

let Cart = require("../models/cart");

let controller = {
  //Guardar un carrito
  save: (req, res) => {
    let params = req.body;

    let cart = new Cart();

    const fechaActual = new Date();
    const fechaLocalColombiana = fechaActual.toLocaleString("es-CO");

    cart.user_id = params.user_id;
    cart.products = params.products;
    cart.createdAt = fechaLocalColombiana;

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

  //obtener carrito por el id de usuario
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

  //actualizar carrito
  updateCart: (req, res) => {
    let params = req.body;

    const fechaActual = new Date();
    const fechaLocalColombiana = fechaActual.toLocaleString("es-CO");

    let updatedFields = {
      updatedAt: fechaLocalColombiana,
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
            messsage: "No se encontro el carrito para actualizar",
          });
        }

        return res.status(200).send({ status: "success", getCart });
      }
    );
  },

  //eliminar carrito
  delete: (req, res) => {
    let cart_id = req.params.cartId;

    Cart.findByIdAndRemove(cart_id, (err, deletedCart) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al elimimnar el carrito: " + err,
        });
      }

      if (!deletedCart) {
        return res.status(404).send({
          status: "error",
          messsage: "No se encontro el carrito para eliminar: " + err,
        });
      }

      return res.status(200).send({ status: "success", deletedCart });
    });
  },
};

module.exports = controller;
