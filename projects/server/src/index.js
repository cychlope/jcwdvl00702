require("dotenv/config");
const express = require(`express`);
const cors = require(`cors`);
const db = require("./models");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const customerRoute = require("./routes/customer");
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");
const addressRoute = require("./routes/address");
const warehouseRoute = require("./routes/warehouse");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const orderItemRoute = require("./routes/orderitem");

const bodyParser = require("body-parser");
const path = require("path");
const { join } = require("path");

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/profileimages",
  express.static(path.join(__dirname, "../public/profileimages"))
);
app.use(
  "/productimages",
  express.static(path.join(__dirname, "../public/productimages"))
);
app.use(
  "/warehouseimages",
  express.static(path.join(__dirname, "../public/warehouseimages"))
);
app.use(
  "/orderimages",
  express.static(path.join(__dirname, "../public/orderimages"))
);

(async () => {
  await db.sequelize.sync();
})();

// db.sequelize.sync();

app.use("/api/customer", customerRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);
app.use("/api/address", addressRoute);
app.use("/api/warehouse", warehouseRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/orderitem", orderItemRoute);

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, () => console.log(`API running:`, PORT));
