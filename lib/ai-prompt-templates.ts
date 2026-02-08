import { AIGeneratedPath } from "@/types/learning-path";

/**
 * Creates a detailed prompt for Gemini AI to generate a structured learning path
 * @param userGoal - The user's learning objective
 * @returns Formatted prompt string
 */
export function createLearningPathPrompt(userGoal: string): string {
  return `Create a comprehensive, personalized learning path for the following goal:

**User Goal:** "${userGoal}"

Generate a complete learning roadmap with practical, actionable content. The path should progress from foundational concepts to advanced topics.

**CRITICAL: You MUST respond with ONLY valid JSON. No markdown, no code blocks, no additional text. Just pure JSON.**

Return a JSON object with this EXACT structure:

{
  "title": "A catchy, motivating title for the learning path (max 60 characters)",
  "description": "A comprehensive 2-3 sentence overview of what the learner will achieve",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedHours": <total estimated hours as a number>,
  "modules": [
    {
      "title": "Module title",
      "description": "What this module covers (1-2 sentences)",
      "estimatedHours": <module duration in hours>,
      "lessons": [
        {
          "title": "Lesson title",
          "content": "Detailed lesson content with:\n- Clear explanations of concepts\n- Code examples (if applicable)\n- Real-world applications\n- Best practices\n- Common pitfalls to avoid\n(Minimum 300 words, maximum 800 words)",
          "objectives": [
            "Specific learning objective 1",
            "Specific learning objective 2",
            "Specific learning objective 3"
          ],
          "resources": [
            {
              "title": "Resource name",
              "url": "https://actual-working-url.com",
              "type": "video|article|documentation|course|tutorial"
            }
          ],
          "quiz": {
            "questions": [
              {
                "question": "Clear, specific question about the lesson content",
                "options": [
                  "Option A",
                  "Option B",
                  "Option C",
                  "Option D"
                ],
                "correctAnswer": 0,
                "explanation": "Why this answer is correct and why others are wrong"
              }
            ],
            "passingScore": 70
          }
        }
      ]
    }
  ]
}

**REQUIREMENTS:**
1. Create 3-5 modules based on the complexity of the goal
2. Each module should have 3-7 lessons
3. Lessons should build upon each other progressively
4. Each lesson must have:
   - Rich, detailed content (300-800 words)
   - 3-5 specific learning objectives
   - 2-5 high-quality external resources with REAL, working URLs
   - A quiz with 3-5 multiple choice questions
5. Quiz questions should test understanding, not just memorization
6. All resources must be real, publicly accessible URLs (MDN, official docs, reputable tutorials)
7. Content should be practical and include code examples where relevant
8. Tailor difficulty to the user's goal

**Example resource URLs (use real ones for the actual topic):**
- https://developer.mozilla.org/en-US/docs/...
- https://www.youtube.com/watch?v=...
- https://nodejs.org/en/docs/...
- https://react.dev/learn/...

Remember: Return ONLY the JSON object, nothing else. No markdown formatting, no explanations.`;
}

/**
 * Validates that the AI response matches the expected structure
 * @param data - Parsed JSON data from AI
 * @returns Whether the data is valid
 */
export function validateAIGeneratedPath(
  data: unknown,
): data is AIGeneratedPath {
  if (typeof data !== "object" || data === null) return false;

  const path = data as Partial<AIGeneratedPath>;

  // Check required top-level fields
  if (
    typeof path.title !== "string" ||
    typeof path.description !== "string" ||
    !["beginner", "intermediate", "advanced"].includes(path.difficulty || "") ||
    typeof path.estimatedHours !== "number" ||
    !Array.isArray(path.modules)
  ) {
    return false;
  }

  // Validate each module
  for (const currentModule of path.modules) {
    if (
      typeof currentModule.title !== "string" ||
      typeof currentModule.description !== "string" ||
      typeof currentModule.estimatedHours !== "number" ||
      !Array.isArray(currentModule.lessons)
    ) {
      return false;
    }

    // Validate each lesson
    for (const lesson of currentModule.lessons) {
      if (
        typeof lesson.title !== "string" ||
        typeof lesson.content !== "string" ||
        !Array.isArray(lesson.objectives) ||
        !Array.isArray(lesson.resources) ||
        typeof lesson.quiz !== "object"
      ) {
        return false;
      }

      // Validate quiz
      if (
        !Array.isArray(lesson.quiz.questions) ||
        typeof lesson.quiz.passingScore !== "number"
      ) {
        return false;
      }

      // Validate questions
      for (const question of lesson.quiz.questions) {
        if (
          typeof question.question !== "string" ||
          !Array.isArray(question.options) ||
          typeof question.correctAnswer !== "number" ||
          typeof question.explanation !== "string"
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Extracts JSON from AI response that might contain markdown code blocks
 * @param response - Raw AI response
 * @returns Cleaned JSON string
 */
export function extractJSONFromResponse(response: string): string {
  // Remove markdown code block formatting if present
  let cleaned = response.trim();

  // Remove ```json and ``` if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return cleaned.trim();
}
