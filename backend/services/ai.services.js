import { GoogleGenAI } from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

const genAI = new GoogleGenAI({apiKey:process.env.GOOGLE_API_KEY});

const analyzeSchema =z.object({
    matchScore:z.number().describe("provide a score between 0 and 100 to analyze how well a candidate matches the job description"),
    missingSkills: z.array(z.string()).describe("List of skill names the candidate is missing"),
    matchingSkills: z.array(z.string()).describe("List of skill names the candidate has"),
    aiFeedback: z.array(z.object({
        section: z.string().describe("The category of feedback, e.g., Strengths, Suggestions"),
        message: z.string().describe("The detailed feedback message")
    })).describe("Detailed AI feedback points"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

export async function generateReport({resume,selfDescription,jobDescription}){
  
    const prompt = `
Analyze the resume and self description whichever is present against the job description. aiFeedback contains messages as points in feedback minimum 2 points

Return ONLY valid JSON using this exact structure:

{
  "matchScore": 0,
  "missingSkills": [],
  "matchingSkills": [],
  "aiFeedback": [
    {
      "message1":"",
      "message2": "",
    }
  ],
  "title": ""
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}`
    

   const response = await genAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema:zodToJsonSchema(analyzeSchema),
        }
   })
   
   const parsed=JSON.parse(response.text);
   //console.log(parsed);
   return parsed
}