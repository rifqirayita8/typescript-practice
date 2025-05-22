import express from 'express';
import authRouter from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { Request, Response, NextFunction } from 'express';
import userManagementRouter from './routes/userManagementRoutes.js';
import helmet from 'helmet';
import scrapeRoutes from './routes/scrapeRoutes.js';
import ahpRouter from './routes/ahpRoutes.js';
import datamasterRouter from './routes/datamasterRoutes.js';
import bookmarkRouter from './routes/bookmarkRoutes.js';
import cors from 'cors';

const app= express();
app.use(cors())

app.use(helmet());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/user-management', userManagementRouter);
app.use('/scrape', scrapeRoutes);
app.use('/ahp', ahpRouter);
app.use('/datamaster', datamasterRouter);
app.use('/bookmark', bookmarkRouter);

const PORT= process.env.APP_PORT;

app.use((err: Error,req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// async function cobaTiga() {
//   const browser= await puppeteer.launch({
//     headless: false,
//     userDataDir: './tmp'
//   })
//   const page= await browser.newPage();
//   await page.goto('https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=lp_16225007011_sar')

//   const productsHandles= await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item')
//   try {
//     for(const productHandle of productsHandles) {
//       const title= await page.evaluate(el => el.querySelector("div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > a > h2 > span")?.textContent, productHandle)

//       console.log(title)
//     }
//   } catch(e) {
//     console.log(e)
//   }
// }



//uhlkhjbladr