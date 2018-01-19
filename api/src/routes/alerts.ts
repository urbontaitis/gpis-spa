import { Request, Response, Router } from "express";

const route: Router = Router();

route.get("/", (req: Request, res: Response) => {
  const { lang } = req.query;
  let result = {};

  switch (lang) {
    case "en":
      result = {
        alerts: [
          {
            title: "Message",
            date: "2018-01-16",
            description:
              "The Fire and Rescue Department informs that snowstorm is foreseen" +
              "in the evening of 16th January 2018. During the night, snowstorm will spread" +
              "in many regions of Lithuania, southeast wind gusts may reach 15-20 m/s." +
              "Please protect yourself and property as well as warn others. For more information visit www.vpgt.lt , www.lt72.lt and www.meteo.lt."
          }
        ]
      };
      break;
    case "lt":
      result = {
        alerts: [
          {
            title: "Pranešimas",
            date: "2018-01-16",
            description:
              "PAGD prie VRM informuoja, kad sausio 16-osios vakare, pradedant vakariniais" +
              " rajonais kils pūga. Naktį iš sausio 16-osios į 17-ąją sningant ir pučiant" +
              " stipriam pietryčių vėjui (gūsiai – 15–20 m/s) pūga numatoma daugelyje rajonų." +
              "Pasirūpinkite savo gyvybės ir turto saugumu, perspėkite kitus. Daugiau informacijos rasite www.vpgt.lt , www.lt72.lt  ir www.meteo.lt."
          }
        ]
      };
      break;
    case "ru":
      result = {
        alerts: [
          {
            title: "Cообщениe",
            date: "2018-01-16",
            description:
              "Департамент пожарной безопасности и спасения при МВД информирует, " +
              "что 16-ого января вечером начиная с западных районов поднимется метель." +
              " Ночью, метель с юго-восточным ветром (порывы которого будут достигать 15–20 м/с)" +
              " пройдёт по многим районам Литвы. Просим позаботиться о своей безопасности и своём " +
              "имуществе. Предупредите окружающих. Более подробная информация на сайтах www.vpgt.lt , www.lt72.lt и www.meteo.lt."
          }
        ]
      };
      break;
    default:
      result = {};
  }

  res.json(result);
});

export default route;
