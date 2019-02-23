# Reddit Mongo - Scraper

This app uses `cheerio`, `express`, `mongoose`, `express-handlebars` and `axios` to scrape old Reddit site and store scraped contents to Mongo DB.
Visitors can scrape new contents and save interesting contents and add comments.

## Deploying to heroku instructions

1. `heroku login`
2. `heroku create`
3. This project requires a hosted Mongo DB, mLab has a free version tied to Heroku:
  `heroku addons:create mongolab`
4. In your `package.json` folder, make sure to add `script: "node index.js"`
5. In connection to Mongo DB, make sure to add `process.env.MONGODB_URI || "mongodb://localhost/localdb"` (mLab MongoDB stores it's credentials in `MONGODB_URI`)
6. `git add .`
7. `git commit -m "deployment commit"`
8. `git push heroku master`

Optionally, you can use `heroku rename NEWNAME` to rename your app to a name better suited to your app
