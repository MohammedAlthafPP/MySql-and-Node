const app = require("./app");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./.env" });

// Server Running
const PORT = process.env.PORT || 4001;
app.listen(PORT, (err) => {
  if (err) {
    return console.log("Server is failed");
  }

  console.log(`Server id running in the PORT:${PORT}`);
});
