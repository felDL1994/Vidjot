if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      'mongo "mongodb+srv://feldl-h5ybj.mongodb.net/test" --username felDL',
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/acme" };
}
