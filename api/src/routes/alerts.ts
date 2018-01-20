import { Request, Response, Router } from "express";
import * as request from "request-promise";
import * as uuid from "uuid";

const route: Router = Router();

route.get("/", (req: Request, res: Response) => {
  const responseResult = [];
  // http://gpis.vpgt.lt/go.php/eng/Sent-messages/301/
  // http://gpis.vpgt.lt/go.php/lit/Issiusti-pranesimai/300
  // http://gpis.vpgt.lt/go.php/rus/Otpravl-soobshtenija/275/
  request
    .get("http://localhost:8000")
    // tslint:disable-next-line:arrow-parens
    .then(result => {
      // tslint:disable-next-line:no-console
      console.log("Started to parse");
      const htmlParser = require("htmlparser2");
      const handler = new htmlParser.DomHandler((error, dom) => {
        if (error) {
          // tslint:disable-next-line:no-console
          console.error(`Klaida: ${error}`);
        } else {
          // tslint:disable-next-line:no-console
          console.info(dom);
          dom.forEach(html => {
            if (html.name === "html") {
              html.children.forEach(body => {
                if (body.name === "body") {
                  body.children.forEach(page => {
                    if (
                      page.name === "div" &&
                      page.attribs !== undefined &&
                      page.attribs.id === "page"
                    ) {
                      page.children.forEach(contents => {
                        if (
                          contents.name === "div" &&
                          contents.attribs.id === "contents"
                        ) {
                          contents.children.forEach(middleSide => {
                            if (
                              middleSide.name === "div" &&
                              middleSide.attribs.class === "middle_side"
                            ) {
                              middleSide.children.forEach(articleList => {
                                if (
                                  articleList.name === "div" &&
                                  articleList.attribs.id === "v_article_list"
                                ) {
                                  articleList.children.forEach(
                                    articleBlocks => {
                                      if (
                                        articleBlocks.name === "div" &&
                                        articleBlocks.attribs.class ===
                                          "article_block"
                                      ) {
                                        articleBlocks.children.forEach(
                                          articleMainBlock => {
                                            if (
                                              articleMainBlock.name === "div" &&
                                              articleMainBlock.attribs.class ===
                                                "artivle_list_main_block"
                                            ) {
                                              let article = {
                                                id: uuid.v4(),
                                                title: "",
                                                date: "",
                                                description: "",
                                                url: ""
                                              };
                                              articleMainBlock.children.forEach(
                                                blocks => {
                                                  if (
                                                    blocks.name === "div" &&
                                                    blocks.attribs.class ===
                                                      "artivle_list_article_name"
                                                  ) {
                                                    blocks.children.forEach(
                                                      name => {
                                                        if (
                                                          name.type ===
                                                            "text" &&
                                                          name.next === null
                                                        ) {
                                                          article.date =
                                                            name.data;
                                                        }
                                                        if (
                                                          name.name === "a" &&
                                                          name.attribs.class ===
                                                            "article-list"
                                                        ) {
                                                          article.title =
                                                            name.children[0].data;
                                                          article.url =
                                                            name.attribs.href;
                                                        }
                                                      }
                                                    );
                                                  }
                                                  if (
                                                    blocks.name === "div" &&
                                                    blocks.attribs.class ===
                                                      "artivle_list_article_header"
                                                  ) {
                                                    let description = "";
                                                    blocks.children.forEach(
                                                      desc => {
                                                        if (
                                                          desc.children !==
                                                          undefined
                                                        ) {
                                                          desc.children.forEach(
                                                            descObj => {
                                                              if (
                                                                descObj.type !==
                                                                "text"
                                                              ) {
                                                                if (
                                                                  descObj
                                                                    .children[0] !==
                                                                    undefined &&
                                                                  descObj
                                                                    .children[0]
                                                                    .type ===
                                                                    "tag"
                                                                ) {
                                                                  descObj.children[0].children.forEach(
                                                                    element => {
                                                                      if (
                                                                        element.type ===
                                                                        "text"
                                                                      ) {
                                                                        description +=
                                                                          element.data;
                                                                      } else {
                                                                        // tslint:disable-next-line:no-console
                                                                        console.log(
                                                                          element
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                                if (
                                                                  descObj
                                                                    .children[0] !==
                                                                    undefined &&
                                                                  descObj
                                                                    .children[0]
                                                                    .type ===
                                                                    "text"
                                                                ) {
                                                                  description +=
                                                                    descObj
                                                                      .children[0]
                                                                      .data;
                                                                }
                                                              }
                                                              // jei neturi spano
                                                              if (
                                                                descObj.type ===
                                                                "text"
                                                              ) {
                                                                description +=
                                                                  descObj.data;
                                                              }
                                                            }
                                                          );
                                                        } else {
                                                          // tslint:disable-next-line:no-console
                                                          // console.error(desc);
                                                        }
                                                      }
                                                    );
                                                    article.description = description;
                                                  }
                                                }
                                              );
                                              responseResult.push(article);
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });

      const parser = new htmlParser.Parser(handler, {
        decodeEntities: true,
        normalizeWhitespace: true
      });
      // parser.parseChunk(result);
      parser.write(result);
      parser.end();
      // tslint:disable-next-line:no-console
      console.log("Ended to parse");
      res.send({ alerts: responseResult });
    });
});

export default route;
