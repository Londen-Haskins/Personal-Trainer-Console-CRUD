<?php

require 'database.php';

// Extract, validate and sanitize the id numbers.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;
$nKey = ($_GET['nKey'] !== null && (int)$_GET['nKey'] > 0)? mysqli_real_escape_string($con, (int)$_GET['nKey']) : false;

if(!$id)
{
  return http_response_code(400);
}
if(!$nKey)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `workouts` WHERE `id` ='{$id}' AND `nKey` ='{$nKey}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
?>