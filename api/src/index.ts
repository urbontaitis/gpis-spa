import app from "./app";

// tslint:disable:no-console
app.listen(process.env.PORT, () =>
  console.info(`Application has started on port ${process.env.PORT}`)
);
