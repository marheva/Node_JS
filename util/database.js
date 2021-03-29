const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (srv, callbackFunction) => {
  MongoClient.connect(srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("[MONGO_DB_CONNECT_CLIENT__CONNECTED");
      _db = client.db();
      callbackFunction(client);
    })
    .catch((error) => {
      console.log("[MONGO_DB_CONNECT_ERROR", error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
