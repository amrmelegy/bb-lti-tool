module.exports = function handler(req, res) {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>*{margin:0;padding:0}html,body{width:100%;height:100%;overflow:hidden}
iframe{width:100%;height:100vh;border:none;display:block}</style>
</head><body>
<iframe src="https://${host}/public/index.html" allowfullscreen></iframe>
</body></html>`);
};
