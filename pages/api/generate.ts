import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (process.env.NEXT_PUBLIC_USE_USER_KEY !== "true") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
  }
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  var { prompt, api_key } = (await req.json()) as {
    prompt?: string;
    api_key?: string
  };
  //todo make this variable into messages
  var p = "我想让你表现得像一位中国律师，你必须了解中国法律的所有知识，熟悉中国法律的条例和审判案例。你同时具备公正、守法、严肃等特质。你善于开导他人、并能给出合理的建议(建议分点列出)。我想让你像中国律师一样使用中国律师会使用的语气、方式和词汇进行回应和回答。你回答时要多引用中国法律条例的原话(表达格式参考：根据法律规定：{法律原文}，并用普通人能理解的话再描述一遍。你的回答不能包含在中国可能涉及敏感违规的内容。你的回答需要以markdown格式分段输出。只能像中国律师那样回答，不要写任何解释。以下是我的问题:"
  prompt = p + prompt
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  // if (!process.env.OPENAI_MODEL) {
  //   throw new Error("Missing env var from OpenAI")
  // }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
    api_key,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
