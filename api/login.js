// LTI 1.3 — OIDC Login Initiation Endpoint
export default function handler(req, res) {

  // اقرأ المعاملات من Blackboard
  const params = req.method === 'POST' ? req.body : req.query;

  const {
    iss,
    login_hint,
    target_link_uri,
    lti_message_hint,
    client_id
  } = params || {};

  // عنوان Blackboard للمصادقة
  // سيتم استبدال BLACKBOARD_DOMAIN بنطاق جامعتك
  const BB_DOMAIN = process.env.BB_DOMAIN || 'https://blackboard.example.com';
  const TOOL_URL  = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.TOOL_URL || 'https://your-tool.vercel.app';

  const authUrl = new URL(`${BB_DOMAIN}/api/v1/lti/1.3/authorization/`);
  authUrl.searchParams.set('scope',                'openid');
  authUrl.searchParams.set('response_type',        'id_token');
  authUrl.searchParams.set('response_mode',        'form_post');
  authUrl.searchParams.set('prompt',               'none');
  authUrl.searchParams.set('redirect_uri',         `${TOOL_URL}/api/lti`);
  authUrl.searchParams.set('client_id',            client_id || '');
  authUrl.searchParams.set('login_hint',           login_hint || '');
  authUrl.searchParams.set('lti_message_hint',     lti_message_hint || '');
  authUrl.searchParams.set('state',                Math.random().toString(36).slice(2));
  authUrl.searchParams.set('nonce',                Math.random().toString(36).slice(2));

  res.redirect(302, authUrl.toString());
}
