<?php
/**
 * Decap CMS GitHub OAuth proxy.
 * Secrets are stored at ~/cms-oauth.php (outside the web root, never in git).
 *
 * Register your GitHub OAuth App with:
 *   Homepage URL:              https://hostedhavens.co
 *   Authorization callback URL: https://hostedhavens.co/oauth.php?action=callback
 */

// Load secrets from the server home directory (two levels above public_html)
$secrets_file = dirname(dirname(dirname(__DIR__))) . '/cms-oauth.php';
if (file_exists($secrets_file)) {
    require $secrets_file;
} else {
    http_response_code(500);
    die('CMS OAuth not configured. See /home/u513808149/cms-oauth.php.');
}
// $client_id and $client_secret must now be defined.

$action = $_GET['action'] ?? 'auth';

// ── Step 1: Redirect the popup to GitHub ─────────────────────────────────────
if ($action === 'auth') {
    $params = http_build_query([
        'client_id'    => $client_id,
        'scope'        => 'repo,user',
        'redirect_uri' => 'https://hostedhavens.co/oauth.php?action=callback',
    ]);
    header('Location: https://github.com/login/oauth/authorize?' . $params);
    exit;
}

// ── Step 2: Exchange code for token, send back to Decap CMS ──────────────────
if ($action === 'callback') {
    $code = $_GET['code'] ?? '';
    if (!$code) {
        http_response_code(400);
        die('Missing authorization code.');
    }

    $ch = curl_init('https://github.com/login/oauth/access_token');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ['Accept: application/json', 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode([
            'client_id'     => $client_id,
            'client_secret' => $client_secret,
            'code'          => $code,
        ]),
    ]);
    $response = curl_exec($ch);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        http_response_code(500);
        die('Token exchange failed: ' . htmlspecialchars($curl_error));
    }

    $data  = json_decode($response, true);
    $token = $data['access_token'] ?? '';

    if (!$token) {
        $msg = htmlspecialchars(json_encode($data));
        echo "<script>(function(){window.opener&&window.opener.postMessage('authorization:github:error:{$msg}','*');window.close();})();</script>";
        exit;
    }

    $payload = json_encode(['token' => $token, 'provider' => 'github']);
    echo "<script>
(function () {
  var msg = 'authorization:github:success:' + JSON.stringify({token:" . json_encode($token) . ",provider:'github'});
  if (window.opener) { window.opener.postMessage(msg, '*'); }
  window.close();
})();
</script>";
    exit;
}

http_response_code(404);
echo 'Not found.';
