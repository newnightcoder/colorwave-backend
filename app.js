import cors from "cors";
import express from "express";

const app = express();
const PORT = 3002;

app.use(cors);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
