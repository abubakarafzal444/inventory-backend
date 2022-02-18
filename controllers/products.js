exports.getAllProds = (req, res, next) => {
  res.status(200).json({ products: [{ name: "prod1" }, { name: "prod2" }] });
};
