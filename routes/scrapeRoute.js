const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Post = require("../model/Post");

router.get("/", async (req, res) => {
  const url = "https://old.reddit.com";
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  $("div.thing").each(async (i, element) => {
    let redditPost = {};
    let title = $(element)
      .children("div")
      .children("div")
      .children("p")
      .children("a")
      .text();
    let link = $(element)
      .children("a")
      .attr("href");
    let thumbnail = $(element)
      .children("a")
      .children("img")
      .attr("src");
    let saved = false;

    //ADD THE REDDIT DOMAIN FOR LINKS THAT LEAD TO SUBREDDITS
    link.indexOf("/r/") !== -1 ? (link = `${url}${link}`) : link;

    //ADD HTTPS: TO THE THUMBNAIL LINKS
    thumbnail ? (thumbnail = `https:${thumbnail}`) : null;
    redditPost = { title, link, thumbnail, saved };

    //ADD THE POST TO DB
    try {
      await Post.create(redditPost);
    } catch (ex) {
      console.log(ex);
    }
  });
  //REDIRECT TO HOME PAGE AFTER SCRAPING
  res.status(200).redirect("/");
});

module.exports = router;
