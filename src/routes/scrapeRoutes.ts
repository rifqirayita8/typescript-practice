import express from 'express';
import getUniversitiesController from '../controllers/scraping/getUniversitiesController.js';
import majorScrapeController from '../controllers/scraping/majorScrapeController.js';

const scrapeRoutes= express.Router();

scrapeRoutes.get('/universities', getUniversitiesController);
scrapeRoutes.get('/majors/:id/', majorScrapeController);

export default scrapeRoutes;