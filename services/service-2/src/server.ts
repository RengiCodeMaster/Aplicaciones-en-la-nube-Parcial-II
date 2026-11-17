import { createApp } from "./app.js";
import { config } from "./config.js";
import { connectDatabase } from "./db.js";

await connectDatabase(config.mongoUri);
createApp().listen(config.port, () => {
  console.log(`Reservations service listening on port ${config.port}`);
});
