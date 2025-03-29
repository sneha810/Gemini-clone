// // const apikey= "AIzaSyAY8y9kAJIqfgMURK8QvpCb6HZ0PiZ-akY"


// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from '@google/generative-ai';
//   const fs = require("node:fs");
//   const mime = require("mime-types");
  
//   const apiKey = process.env.AIzaSyAY8y9kAJIqfgMURK8QvpCb6HZ0PiZ-akY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseModalities: [
//     ],
//     responseMimeType: "text/plain",
//   };
  
//   async function run(prompt) {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//       ],
//     });
  
//     const result = await chatSession.sendMessage(prompt);
//     // TODO: Following code needs to be updated for client-side apps.
//     const candidates = result.response.candidates;
//     for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//       for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//         const part = candidates[candidate_index].content.parts[part_index];
//         if(part.inlineData) {
//           try {
//             const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//             fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
//             console.log(`Output written to: ${filename}`);
//           } catch (err) {
//             console.error(err);
//           }
//         }
//       }
//     }
//     console.log(result.response.text());
//   }
  
//   export default run


import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAfWSsgWJrWTmPgqjGqPGGFztRI0u93tdY';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  // Instead of fs, use Blob for creating files to download in the browser.
  const candidates = result.response.candidates;
  for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if (part.inlineData) {
        try {
          const mimeType = part.inlineData.mimeType || 'application/octet-stream';
          const filename = `output_${candidate_index}_${part_index}.${mimeType.split('/')[1] || 'txt'}`;
          
          // Create a Blob instead of using fs.writeFileSync (which doesn't work in the browser)
          const blob = new Blob([Buffer.from(part.inlineData.data, 'base64')], { type: mimeType });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  console.log(result.response.text());
  return result.response.text();
}

export default run;
