const config = require("./utils/config.js");
const app = require("./app.js");
const { info } = require("./utils/logger.js");

const PORT = config.PORT;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
