import next from "next";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import passportConfig from "./util/passport-config.js";
import { connection } from "./connection/database.js";
import routes from './routes/main-route.js';
import cors from './util/cors.js';
import configureMulter from './util/multer.js';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express(); 

  server.use(
    session({
      secret: "",
      resave: false,
      saveUninitialized: false
    })
  );

  const passport = passportConfig(); 
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(cors);
  server.use(bodyParser.urlencoded({ extended: true }));

  const upload = configureMulter();

  server.use(bodyParser.json());
  server.use(upload.single('image'));
  server.use('/api/v1', routes);

  connection.sync()
    .then(() => {
      console.log("Database synced successfully.");

      const port = process.env.PORT || 3001;
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch(err => {
      console.error("Error syncing database:", err);
    });
});
