"use server";

import OpenAI from "openai";
import {
  GET_OPTIMIZED_RESUME_PROMPT,
  GET_COVER_LETTER_PROMPT,
} from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeResumeAndGenerateCoverLetter(
  resume: string,
  jobDescription: string
) {
  try {
    console.log("Optimizing resume and generating cover letter...");
    console.info(GET_OPTIMIZED_RESUME_PROMPT(resume, jobDescription));
    const [optimizeResponse, coverLetterResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: GET_OPTIMIZED_RESUME_PROMPT(resume, jobDescription),
          },
        ],
      }),
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: GET_COVER_LETTER_PROMPT(resume, jobDescription),
          },
        ],
      }),
    ]);

    const optimizedResume = optimizeResponse.choices[0]?.message?.content || "";
    const coverLetter = coverLetterResponse.choices[0]?.message?.content || "";

    return { optimizedResume, coverLetter };
  } catch (error) {
    console.error("Error in optimizeResumeAndGenerateCoverLetter:", error);
    throw error;
  }
}
