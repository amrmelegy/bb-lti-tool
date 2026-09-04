# bb-lti-tool

## الروابط المطلوبة في Blackboard Developer Portal

بعد النشر على Vercel، استبدل `YOUR-TOOL` بعنوانك الفعلي:

| الحقل في Portal              | القيمة                                      |
|-----------------------------|---------------------------------------------|
| Tool Domain                 | `https://YOUR-TOOL.vercel.app`              |
| Login Initiation URL        | `https://YOUR-TOOL.vercel.app/api/login`    |
| Tool Redirect URL           | `https://YOUR-TOOL.vercel.app/api/lti`      |
| JWKS URL                    | `https://YOUR-TOOL.vercel.app/api/lti`      |

## Environment Variables في Vercel

| المتغير     | القيمة                              |
|------------|-------------------------------------|
| BB_DOMAIN  | `https://psau-test.blackboard.com`  |
| TOOL_URL   | `https://YOUR-TOOL.vercel.app`      |
