const { randomBytes } = require('crypto');

const CLIENT_ID   = 'cef109ef-b32c-471b-9d4a-aebe2ebe3262';
const BB_AUTH_URL = 'https://psau-test.blackboard.com/api/v1/lti/1.3/authorization/';

module.exports = function handler(req, res) {
  const p = req.method === 'POST' ? req.body : req.query;
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  const url = new URL(BB_AUTH_URL);
  url.searchParams.set('scope',            'openid');
  url.searchParams.set('response_type',    'id_token');
  url.searchParams.set('response_mode',    'form_post');
  url.searchParams.set('prompt',           'none');
  url.searchParams.set('client_id',        CLIENT_ID);
  url.searchParams.set('redirect_uri',     `https://${host}/api/lti`);
  url.searchParams.set('login_hint',       p.login_hint       || '');
  url.searchParams.set('lti_message_hint', p.lti_message_hint || '');
  url.searchParams.set('state',            randomBytes(16).toString('hex'));
  url.searchParams.set('nonce',            randomBytes(16).toString('hex'));

  res.redirect(302, url.toString());
};
