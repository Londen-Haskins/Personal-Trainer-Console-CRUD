<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->name) === '' || (float)$request->name < 0)
  {
    return http_response_code(400);
  }
  if(trim($request->subscription) === '' || (float)$request->subscription < 0)
  {
    return http_response_code(400);
  }

  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->name));
  $subscription = mysqli_real_escape_string($con, trim($request->subscription));


  // Create.
  $newId = random_int(00000,99999);
  $sql = "INSERT INTO `users`(`id`,`name`,`subscription`,`workoutId`,`dietId`) VALUES (NULL,'{$name}','{$subscription}','{$newId}','{$newId}')";
  

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user = [
      'id' => mysqli_insert_id($con),
      'name' => $name,
      'subscription' => $subscription,
      'workoutId' => $newId,
      'dietId' => $newId
    ];
    echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}