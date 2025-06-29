import app from "./app";
import config from "./utilities/config";
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
