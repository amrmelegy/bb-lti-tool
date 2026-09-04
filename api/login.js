import { randomBytes } from 'crypto';

// ===== قيم مأخوذة من Blackboard Admin =====
const CLIENT_ID     = 'cef109ef-b32c-471b-9d4a-aebe2ebe3262';
const BB_AUTH_URL   = 'https://psau-test.blackboard.com/api/v1/lti/1.3/authorization/';
// ==========================================

export default function handler(req, res) {
  const p = req.method === 'POST' ? req.body : req.query;

  const host     = req.headers['x-forwarded-host'] || req.headers.host;
  const TOOL_URL = `https://${host}`;

  const state = randomBytes(16).toString('hex');
  const nonce = randomBytes(16).toString('hex');

  const url = new URL(BB_AUTH_URL);
  url.searchParams.set('scope',            'openid');
  url.searchParams.set('response_type',    'id_token');
  url.searchParams.set('response_mode',    'form_post');
  url.searchParams.set('prompt',           'none');
  url.searchParams.set('client_id',        CLIENT_ID);
  url.searchParams.set('redirect_uri',     `${TOOL_URL}/api/lti`);
  url.searchParams.set('login_hint',       p.login_hint       || '');
  url.searchParams.set('lti_message_hint', p.lti_message_hint || '');
  url.searchParams.set('state',            state);
  url.searchParams.set('nonce',            nonce);

  res.setHeader('Set-Cookie', `lti_state=${state}; SameSite=None; Secure; Path=/`);
  res.redirect(302, url.toString());
}
