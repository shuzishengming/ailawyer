
## [English](README_EN.md)

AI律师，在线答疑。



## 这个项目是如何工作的
这个项目主要使用了 [OpenAI GPT-3.5 API](https://platform.openai.com/docs/introduction) 和 [Vercel Edge functions](https://vercel.com/features/edge-functions)。它根据用户输入构建一个 Prompt，通过 Vercel Edge 函数将其发送到 GPT-3.5 API，然后将响应流传回应用程序。

## 线上一键部署

用 [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) 一键部署:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chatgptworld/ailawyer&env=OPENAI_API_KEY,NEXT_PUBLIC_USE_USER_KEY&project-name=weekly_report&repo-name=weekly_report)

环境变量如下所示：
```
OPENAI_API_KEY=xxxxx
NEXT_PUBLIC_USE_USER_KEY = false  
```

## 在本地运行

**由于众所周知的原因，OpenAI API 的域名 api.openai.com 已无法在大陆网络环境下访问，请自行解决网络代理问题。

clone 此 repo，去 [OpenAI](https://beta.openai.com/account/api-keys) 注册一个账号，拿到 API key，放到 `.env` 文件。本地文件 `.env.example` 要改成 `.env`。


确保你本地的 npm 命令生效，执行以下命令
```bash
npm install
npm run dev
```
打开 `http://localhost:3000`

## Docker 部署

```bash
docker run -d -p 3000:3000 --name weekly_report-docker -e OPENAI_API_KEY=sk-xxxxx ihxrainbow/weekly_report-docker
```

docker-compose.yml
```yaml
services:
  weekly_report-docker:
    container_name: weekly_report-docker
    ports:
      - '3000:3000'
    image: ihxrainbow/weekly_report-docker
    environment:
      # API key
      - OPENAI_API_KEY=sk-xxxxx
```

<!-- https://www.seotraininglondon.org/gpt3-business-email-generator/ -->



## 感谢

受 [weekly-report](https://github.com/guaguaguaxia/weekly_report) 启发.


