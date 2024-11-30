'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function optimizeResumeAndGenerateCoverLetter(resume: string, jobDescription: string) {
  try {
    const optimizePrompt = `
      Given the following resume and job description, optimize the resume to better match the job requirements:

      Resume:
      ${resume}

      Job Description:
      ${jobDescription}

      Please provide an optimized version of the resume.
    `

    const coverLetterPrompt = `
      Given the following resume and job description, generate a cover letter:

      Resume:
      ${resume}

      Job Description:
      ${jobDescription}

      Please write a professional cover letter tailored to this job opportunity.
    `

    const [optimizeResponse, coverLetterResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: optimizePrompt }],
      }),
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: coverLetterPrompt }],
      })
    ])

    const optimizedResume = optimizeResponse.choices[0]?.message?.content || ''
    const coverLetter = coverLetterResponse.choices[0]?.message?.content || ''

    return { optimizedResume, coverLetter }
  } catch (error) {
    console.error('Error in optimizeResumeAndGenerateCoverLetter:', error)
    throw error
  }
}

