import express from 'express';
import getUniversitiesController from '../controllers/scraping/getUniversitiesController.js';
import majorScrapeController from '../controllers/scraping/majorScrapeController.js';
import { scrapePTN } from '../repositories/scraperRepository.js';
import universityPddiktiController from '../controllers/scraping/universityPddiktiController.js';
import majorsPddiktiController from '../controllers/scraping/majorsPddiktiController.js';
import pythonScrapingController from '../controllers/scraping/pythonScrapingController.js';

const scrapeRoutes= express.Router();

scrapeRoutes.get('/universities', getUniversitiesController);
scrapeRoutes.get('/majors/:id/', majorScrapeController);
scrapeRoutes.get('/ptn', scrapePTN);
scrapeRoutes.get('/pddikti', universityPddiktiController);
scrapeRoutes.get('/pddiktiMajors', majorsPddiktiController);
scrapeRoutes.get('/python', pythonScrapingController);


export default scrapeRoutes;