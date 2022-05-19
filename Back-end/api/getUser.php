<?php

/**
 * Returns the details of a user account.
 */
require 'database.php';

$id = $_GET['id'];


$user = [];

$sql = "SELECT SELECT id, name, subscription, workoutId, dietId FROM users";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
	$user[$i]['workoutId'] = $row['workoutId'];
    $user[$i]['name'] = $row['name'];
    $user[$i]['subscription'] = $row['subscription'];
    $users[$i]['workoutId'] = $row['workoutId'];
    $users[$i]['dietId'] = $row['dietId'];
    $i++;
  }

  echo json_encode($user);
}
else
{
  http_response_code(404);
}


?>