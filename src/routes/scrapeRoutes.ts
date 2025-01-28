import express from 'express';
import getUniversitiesController from '../controllers/scraping/getUniversitiesController.js';

const scrapeRoutes= express.Router();

scrapeRoutes.get('/universities', getUniversitiesController);

export default scrapeRoutes;