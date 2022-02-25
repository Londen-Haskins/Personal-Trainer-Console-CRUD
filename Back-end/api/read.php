<?php

/**
 * Returns the list of users.
 */
require 'database.php';

$users = [];
$sql = "SELECT id, name, subscription, workoutId, dietId FROM users";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$i]['id'] = $row['id'];
    $users[$i]['name'] = $row['name'];
    $users[$i]['subscription'] = $row['subscription'];
    $users[$i]['workoutId']    = $row['workoutId'];
    $users[$i]['dietId']    = $row['dietId'];
    $i++;
  }

  echo json_encode($users);
}
else
{
  http_response_code(404);
}
?>