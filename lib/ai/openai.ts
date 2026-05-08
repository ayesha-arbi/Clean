import OpenAI from "openai";

// Instantiate the OpenAI client. 
// It automatically picks up OPENAI_API_KEY from the environment.
export const openai = new OpenAI();