import express, { json } from "express";
import cors from "cors";

import mainRouter from "./routes/index";

app.use(cors());
app.use(json());

const app = express();

app.use("/api/v1", mainRouter);

app.listen(3000);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword ...

// /api/v1/account/transferMoney
// /api/v1/account/balance
