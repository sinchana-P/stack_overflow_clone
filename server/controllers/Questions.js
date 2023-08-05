import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

// backend of asking a question:
// saves questions in database
export const AskQuestion = async (req, res) => {
        // here, retrieved data from front end in postQuestionData.
        const postQuestionData = req.body;
        
        const postQuestion = new Questions({ ...postQuestionData, userId: req.userId });
        // above, we created a new Questions object of Questions model
        // & sending the data (postQuestionData) from front end to database, along with userId.

        try {
            await postQuestion.save();
            // since we have created a new object of "Questions", we have to save that "object" in "MongoDB".

            // if it is successfully saved, then display message to the frontend.
            res.status(200).json("Posted a question successfully") 
        } catch (error) {
            console.log(error);
            res.status(409).json("Couldn't post a new question") 
        }
}

// this fetches data (questions, it's list) from database.
// this gonna be asynchronous fun, bcoz we gonna access database, which is deployed in the cloud.
export const getAllQuestions = async (eq, res) => {
    try {
        // Questions ---> Questions schema
        // .find() ---> go and finds all the records inside questions and put it in questionList.
        const questionList = await Questions.find(); 

        // now we send this "questionList" as response to the client.
        res.status(200).json(questionList);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



// export default AskQuestion