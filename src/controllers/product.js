"use strict";

let Product = require("../models/product");

let controller = {
  //Guardar un producto
  save: (req, res) => {
    let params = req.body;

    let product = new Product();

    product.title = params.title;
    product.detail = params.detail;
    product.price = params.price;
    product.quantity = params.quantity;
    product.image = params.image;
    product.size = params.size;

    product.save((err, productStored) => {
      if (err || !productStored) {
        return res
          .status(404)
          .send({ status: "error", messsage: "El producto no se ha guardado" });
      }

      return res.status(200).send({
        status: "success",
        productStored,
      });
    });
  },

  //Listar productos
  getProducts: (req, res) => {
    let query = Product.find({});

    query.countDocuments({}, (err, count) => {
      if (err) {
        console.error(err);
      }
      console.log(`Número de documentos en la colección: ${count}`);
    });

    query.sort("-date").exec((err, products) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al traer los productos",
        });
      }

      if (!products) {
        return res
          .status(404)
          .send({ status: "error", messsage: "No hay producto para mostrar" });
      }

      return res.status(200).send({ status: "success", products });
    });
  },

  // Listar productos con paginación
  getRangeProducts: (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, predeterminada: 1
    const limit = 6; // Cantidad de productos por página, predeterminado: 10

    const skip = (page - 1) * limit; // Calcular el número de documentos para omitir

    Product.find({})
      .sort("-date")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(500).send({
            status: "Error",
            message: "Error al traer los productos",
          });
        }

        if (!products || products.length === 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay producto para mostrar",
          });
        }

        Product.countDocuments({}, (err, count) => {
          if (err) {
            console.error(err);
            return;
          }
          return res
            .status(200)
            .send({ status: "success", totalCount: count, products });
        });
      });
  },

  //Listar  un producto
  getOneProduct: (req, res) => {
    let productId = req.params.id;

    Product.findById({ _id: productId }, (err, getProduct) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al traer el producto",
        });
      }

      if (!getProduct) {
        return res
          .status(404)
          .send({ status: "error", messsage: "No se encontro el producto" });
      }

      return res.status(200).send({ status: "success", getProduct });
    });
  },

  //Eliminar productos
  deleteProduct: (req, res) => {
    let productId = req.params.id;

    Product.findOneAndDelete({ _id: productId }, (err, productRemove) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al eliminar el producto",
        });
      }

      if (!productRemove) {
        return res
          .status(404)
          .send({ status: "error", messsage: "No hay producto para eliminar" });
      }

      return res.status(200).send({
        status: "success",
        product: productRemove,
      });
    });
  },
};

module.exports = controller;
