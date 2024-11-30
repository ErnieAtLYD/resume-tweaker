
export const GET_OPTIMIZED_RESUME_PROMPT = (resume: string, jobDescription: string) => `
    You are tasked with optimizing a resume to better match a specific job description. This is a crucial task in helping job seekers increase their chances of getting an interview and ultimately landing their desired position. Follow these steps carefully to complete the task effectively.:

    First, review the resume provided:
    <resume>
    ${resume}
    </resume>

    Next, review the job description:
    <job_description>
    ${jobDescription}
    </job_description>

    Analyze the job description carefully, identifying key requirements, skills, and qualifications the employer is seeking. Pay attention to specific technologies, methodologies, or experiences mentioned.

    Compare the resume with the job requirements. Look for:
    1. Skills or experiences in the resume that match the job requirements
    2. Relevant accomplishments that align with the job's needs
    3. Areas where the resume falls short of the job requirements

    To optimize the resume, follow these guidelines:
    1. Reorder or reword experiences to highlight those most relevant to the job
    2. Use keywords and phrases from the job description in the resume where applicable and truthful
    3. Quantify achievements where possible to demonstrate impact
    4. Remove or downplay information that is not relevant to this specific job
    5. Ensure the resume length remains appropriate (typically 1-2 pages)
    6. Maintain honesty and accuracy - do not fabricate or exaggerate experiences.

    Now, rewrite the optimized resume, maintaining a professional format. Remember, the goal is to tailor the resume to the specific job while maintaining accuracy and professionalism
    `

export const GET_COVER_LETTER_PROMPT = (resume: string, jobDescription: string) => `You are tasked with generating a personalized cover letter based on a given resume and job description. Follow these instructions carefully to create an effective and tailored cover letter

      First, review the resume provided:
      <resume>
      ${resume}
      </resume>

      Next, review the job description:
      <job_description>
      ${jobDescription}
      </job_description>

      Now, follow these steps to create the cover letter:

      1. Analyze the resume and job description:
         - Identify key skills, experiences, and qualifications mentioned in the job description.
         - Find matching or relevant experiences and skills in the resume.
         - Note any specific requirements or preferences stated in the job description.

      2. Structure the cover letter as follows:
         - Opening paragraph: Introduce yourself and state the position you're applying for.
         - Body paragraphs (1-2): Highlight relevant experiences and skills that match the job requirements.
         - Closing paragraph: Express enthusiasm for the position and company, and request an interview.

      3. Include the following elements in your cover letter:
         - Address the letter to a specific person if mentioned in the job description, otherwise use "Dear Hiring Manager,"
         - Mention where you found the job posting.
         - Tailor your experiences and skills to the specific needs of the position and company.
         - Use keywords from the job description naturally throughout the letter.
         - Keep the tone professional yet enthusiastic.
         - Limit the letter to one page (about 3-4 paragraphs).

      4. Format your response as follows:
         - Begin with a salutation.
         - Write the body of the cover letter.
         - End with a professional closing and the applicant's name.

      Write your complete cover letter. Ensure that the letter is well-written, error-free, and specifically tailored to the job and company described in the job description.
    `
    