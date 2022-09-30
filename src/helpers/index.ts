import puppeteer from 'puppeteer';
import { PUPPETEER_USER_AGENT } from '../config';
import { Link } from '../types';

export const getHTMLTitle = (url: string): Promise<Link | null> => {
  return new Promise(async (rsv, _) => {
    try {
      // to accomodate for URL like e.g www.damiisdandy.com
      const URL = !url.startsWith('http') ? `https://${url}` : url;
      // Used puppeteer because, some websites like twitter has some client side-rendered pages
      // So using normal axios to fetch the html isn't going to get the dynamic <title/>
      const browser = await puppeteer.launch()

      const page = await browser.newPage();
      await page.setUserAgent(PUPPETEER_USER_AGENT);
      await page.goto(URL);

      const pageContent = await page.content();
      const title = pageContent.match(/<title>(.*?)<\/title>/g) || [];
      if (title) {
        rsv({
          title: title[0].replace(/<\/?title>/g, ''),
          url,
        })
      } else {
        rsv(null);
      }
    } catch (err) {
      console.log(err);
      // if URL is invalid, ignore that url
      rsv(null);
    }
  })
};