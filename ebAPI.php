<?php

$response = file_get_contents("https://www.eventbriteapi.com/v3/users/me/owned_events/?token=[YOUR API KEY]");

echo $response;

?>
