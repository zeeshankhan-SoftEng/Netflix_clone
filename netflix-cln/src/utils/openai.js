import OpenAI from "openai";
import { AI_KEY } from "./constants";

const open = new OpenAI({
  apiKey: AI_KEY,
  dangerouslyAllowBrowser: true,
});

export default open;
  