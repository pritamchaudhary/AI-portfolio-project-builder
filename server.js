import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFDocument from 'pdfkit';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
	console.warn('[server] No GEMINI_API_KEY provided. /api/suggest will return 501.');
}

app.post('/api/suggest', async (req, res) => {
	try {
		if (!API_KEY) return res.status(501).json({ error: 'API not configured' });
		const { resumeText } = req.body || {};
		if (!resumeText || typeof resumeText !== 'string') return res.status(400).json({ error: 'resumeText required' });
		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
		const prompt = [
			"You are an assistant that suggests trending guided software projects tailored to a user's resume skills.",
			'Return ONLY a JSON array of 5 objects, no prose.',
			'Each object must have: title, description, tags (array of lowercase tokens), difficulty (Beginner|Intermediate|Advanced), guideUrl.',
			'Prefer modern, currently popular stacks. Consider the provided resume text and inferred skills.',
			'Resume text:',
			resumeText
		].join('\n');
		const result = await model.generateContent(prompt);
		const text = result.response.text();
		const match = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
		const json = JSON.parse(match ? match[0] : text);
		return res.json(Array.isArray(json) ? json.slice(0, 5) : json);
	} catch (e) {
		console.error('[server] suggest error', e);
		return res.status(500).json({ error: 'suggest_failed' });
	}
});



app.post('/api/generate-project-pdf', async (req, res) => {
  if (!API_KEY) return res.status(501).json({ error: 'API not configured' });
  const { title } = req.body || {};
  if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Project title required' });

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert developer. Provide a detailed step-by-step development guide to create the following project:\nTitle: ${title}\nRespond with plain text only.`;

    const result = await model.generateContent(prompt);
    const guideText = result.response.text();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title.replace(/\s+/g, '-')}.pdf"`);

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text(title, { underline: true, align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(guideText, { lineGap: 4 });
    doc.end();
  } catch (e) {
    console.error('[server] generate-project-pdf error', e);
    res.status(500).json({ error: 'Failed to generate project PDF' });
  }
});



const port = process.env.PORT || 5175;
app.listen(port, () => {
	console.log(`[server] listening on http://localhost:${port}`);
});
