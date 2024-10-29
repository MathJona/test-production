import Express from "express";
import morgan from "morgan";
import router from "./src/routes";

export class App {
  app: Express.Application;
  port = Number(process.env.PORT);

  constructor() {
    this.app = Express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(Express.json());
    this.app.use(morgan("dev"));
    this.app.use(router);
  }

  listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
    return server;
  }
}
