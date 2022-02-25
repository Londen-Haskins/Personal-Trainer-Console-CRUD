<?php

/**
 * Returns the details of a user account.
 */
require 'database.php';

$id = $_GET['id'];


$user = [];
$workout = [];
$sql = "SELECT users.workoutId, users.name, users.subscription, workouts.exercise, 
 workouts.weight, workouts.sets, workouts.reps, workouts.notes, workouts.nKey FROM users LEFT JOIN
 workouts ON users.workoutId=workouts.id WHERE users.id= '{$id}'";
$sql2 = "SELECT exercise, weight, sets, reps, notes FROM workouts WHERE id = '{$id}'";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
	$user[$i]['workoutId'] = $row['workoutId'];
    $user[$i]['name'] = $row['name'];
    $user[$i]['subscription'] = $row['subscription'];
	$user[$i]['exercise'] = $row['exercise'];
	$user[$i]['weight'] = $row['weight'];
	$user[$i]['sets'] = $row['sets'];
	$user[$i]['reps'] = $row['reps'];
	$user[$i]['notes'] = $row['notes'];
	$user[$i]['nKey'] = $row['nKey'];
    $i++;
  }

  echo json_encode($user);
}
else
{
  http_response_code(404);
}


?>