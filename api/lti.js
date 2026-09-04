// LTI 1.3 Launch Handler
export default async function handler(req, res) {

  // ضروري لإتاحة التضمين داخل Blackboard
  res.setHeader('X-Frame-Options',          'ALLOWALL');
  res.setHeader('Content-Security-Policy',  'frame-ancestors *');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // GET مباشر — اعرض الصفحة
  if (req.method === 'GET') {
    return serveContent(req, res);
  }

  // OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST من Blackboard — يحتوي id_token
  if (req.method === 'POST') {
    // Blackboard أرسل الطالب بعد المصادقة — نعرض المحتوى مباشرة
    return serveContent(req, res);
  }

  res.status(405).end();
}

function serveContent(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const TOOL_URL = `https://${host}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    iframe {
      width: 100%; height: 100vh;
      border: none; display: block;
    }
  </style>
</head>
<body>
  <iframe
    src="${TOOL_URL}/public/index.html"
    allowfullscreen
    allow="fullscreen; clipboard-write"
    title="Course Content">
  </iframe>
</body>
</html>`);
}
