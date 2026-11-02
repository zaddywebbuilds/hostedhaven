<?php
$client_id     = 'Ov23liQtPrNwUpzVYHgw';
$client_secret = '6a48e4276e9be2a52d7ee04c5be47d5feca22146';
$callback_url  = 'https://hostedhavens.co/cms-oauth.php';

$action = $_GET['action'] ?? $_GET['provider'] ?? '';
$code   = $_GET['code']   ?? '';

if ($action === 'auth' || $action === 'github') {
    $state = bin2hex(random_bytes(16));
    setcookie('oauth_state', $state, time() + 300, '/', '', true, true);
    $params = http_build_query([
        'client_id'    => $client_id,
        'scope'        => 'repo,user',
        'state'        => $state,
        'redirect_uri' => $callback_url,
    ]);
    header('Location: https://github.com/login/oauth/authorize?' . $params);
    exit;
}

if ($code) {
    $response = file_get_contents('https://github.com/login/oauth/access_token', false,
        stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json\r\n",
            'content' => http_build_query([
                'client_id'     => $client_id,
                'client_secret' => $client_secret,
                'code'          => $code,
                'redirect_uri'  => $callback_url,
            ]),
        ]])
    );
    $data  = json_decode($response, true);
    $token = $data['access_token'] ?? '';
    $error = $data['error_description'] ?? $data['error'] ?? 'unknown error';

    if ($token) {
        $msg = 'authorization:github:success:' . json_encode(['token' => $token, 'provider' => 'github']);
    } else {
        $msg = 'authorization:github:error:' . $error;
    }
    echo "<!DOCTYPE html><html><body><script>
        (function() {
            var msg = " . json_encode($msg) . ";
            if (window.opener) { window.opener.postMessage(msg, '*'); window.close(); }
            else { document.body.innerText = 'Auth complete. You may close this window.'; }
        })();
    </script></body></html>";
    exit;
}

http_response_code(400);
echo 'Invalid request.';
