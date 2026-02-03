
import { GoogleGenAI } from "@google/genai";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateTeacherPortrait = async (
  imageFile: File,
  style: string,
  concepts: string[]
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(imageFile);

  const conceptsString = concepts.join(', ');
  const prompt = `Create an 8K, ultra-realistic, professional portrait of the person in the provided image.
It is critically important to maintain the exact facial features, expression, and identity of the person. Do not alter their face.
The desired style is "${style}".
The concept and background should be: "${conceptsString}".
The final image should look like a professional photograph suitable for a teacher's portfolio.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
          parts: [
              imagePart,
              { text: prompt },
          ],
      },
    });

    const candidate = response.candidates?.[0];

    if (!candidate) {
        throw new Error("No candidates returned from the model.");
    }

    if (candidate.finishReason === 'SAFETY') {
        throw new Error("The request was blocked due to safety filters. Please try a different photo.");
    }

    // Safely access parts using optional chaining to avoid "Cannot read properties of undefined (reading 'parts')"
    const parts = candidate.content?.parts;

    if (!parts || parts.length === 0) {
        throw new Error(`Generation failed. The model returned no content. Finish reason: ${candidate.finishReason || 'Unknown'}`);
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.mimeType && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    // If no image is found, check for a text response to provide a better error message
    const textPart = parts.find(p => p.text);
    if (textPart && textPart.text) {
        throw new Error(`Model message: ${textPart.text}`);
    }

    throw new Error("No image was generated. The model might have returned only text.");

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};
