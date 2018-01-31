import * as cheerio from "cheerio";
import { Request, Response, Router } from "express";
import * as fs from "fs";
import * as request from "request-promise";
import * as uuid from "uuid";

const route: Router = Router();

const apiUrl = (lang: string) => {
  switch (lang) {
    case "lt":
      return "http://gpis.vpgt.lt/go.php/lit/Issiusti-pranesimai/300";
    case "en":
      return "http://gpis.vpgt.lt/go.php/eng/Sent-messages/301/";
    case "ru":
      return "http://gpis.vpgt.lt/go.php/rus/Otpravl-soobshtenija/275/";
  }
};

route.get("/", (req: Request, res: Response) => {
  const { lang } = req.query;

  if (lang === undefined) {
    res.json({});
  }

  // `http://localhost:8000/${lang}.html`
  request
    .get(apiUrl(lang))
    .then((result: any) => {
      const $ = cheerio.load(result);
      const alertsToList = [];
      $(".artivle_list_main_block").each((i, elem) => {
        const articleNameBlock = $(elem)
          .find(".artivle_list_article_name")
          .text()
          .trim()
          .split(" ");
        alertsToList[i] = {
          id: uuid.v4(),
          title: $(elem)
            .find(".artivle_list_article_name")
            .children(".article-list")
            .text(),
          date: articleNameBlock[articleNameBlock.length - 1],
          description: $(elem)
            .find("p")
            .text()
            .trim(),
          url: $(elem)
            .find(".article_header")
            .attr("href")
        };
      });

      res.send({ alerts: alertsToList });
    })
    .catch((err: any) => {
      res.json({ errors: err });
    });
});

route.post("/sync", (req: Request, res: Response) => {
  // example how to store to json :)
  const alertsToList = [];
  const alertsToListTrimmed = alertsToList.filter((n: any) => n !== undefined);
  fs.writeFile(
    "alerts.json",
    JSON.stringify(alertsToListTrimmed, null, 4),
    (err: any) => res.send("File successfully written!")
  );
});

export default route;
