<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  $id = $request->id;

  // Validate.
  if (trim($request->name) == '' || trim($request->subscription) == '') {
    return http_response_code(400);
  }

  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->name));
  $subscription = mysqli_real_escape_string($con, trim($request->subscription));

  // Update.
  $sql = "UPDATE `users` SET `name`='$name',`subscription`='$subscription' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
?>