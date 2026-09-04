// LTI 1.3 Launch Handler — Vercel Serverless Function
export default function handler(req, res) {

  // السماح بالتضمين من Blackboard
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');

  // معالجة طلب LTI POST من Blackboard
  if (req.method === 'POST') {
    // Blackboard يرسل POST عند الإطلاق — نعيد توجيهه للصفحة
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="refresh" content="0;url=/public/index.html">
        <script>window.location.href='/public/index.html';</script>
      </head>
      <body></body>
      </html>
    `);
    return;
  }

  // GET — نعيد الصفحة مباشرة
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="refresh" content="0;url=/public/index.html">
      <script>window.location.href='/public/index.html';</script>
    </head>
    <body></body>
    </html>
  `);
}
