import express from 'express'

import { signup, login } from '../controllers/auth.js'

const router = express.Router();

// in index.js
// for url :  /user/signup          old: // router.post('/signup', () => {})
router.post('/signup', signup) 
// , signup ---> is a controller

// for url :  /user/login
router.post('/login', login)
// , login ---> is a controller

export default router