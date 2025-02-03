import express from 'express';
import getUniversitiesController from '../controllers/scraping/getUniversitiesController.js';
import majorScrapeController from '../controllers/scraping/majorScrapeController.js';
import { scrapePTN } from '../repositories/scraperRepository.js';
import universityPddiktiController from '../controllers/scraping/universityPddiktiController.js';

const scrapeRoutes= express.Router();

scrapeRoutes.get('/universities', getUniversitiesController);
scrapeRoutes.get('/majors/:id/', majorScrapeController);
scrapeRoutes.get('/ptn', scrapePTN);
scrapeRoutes.get('/pddikti', universityPddiktiController);

export default scrapeRoutes;