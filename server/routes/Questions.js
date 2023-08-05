import express from 'express';

import { AskQuestion } from '../controllers/Questions.js'
import { getAllQuestions } from '../controllers/Questions.js'

const router = express.Router()

// url:     /questions/Ask
router.post('/Ask', AskQuestion);

// url:     /questions/get
router.get('/get', getAllQuestions);

export default router
