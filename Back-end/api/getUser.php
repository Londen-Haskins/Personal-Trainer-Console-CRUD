<?php

/**
 * Returns the details of a user account.
 */
require 'database.php';

$id = $_GET['id'];


$workout = [];

$sql = "SELECT exercise, weight, sets, reps, notes, nKey FROM workouts WHERE id = '{$id}'";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
	$workout[$i]['exercise'] = $row['exercise'];
    $workout[$i]['weight'] = $row['weight'];
    $workout[$i]['sets'] = $row['sets'];
    $workout[$i]['reps'] = $row['reps'];
    $workout[$i]['notes'] = $row['notes'];
    $workout[$i]['nKey'] = $row['nKey'];

    $i++;
  }

  echo json_encode($workout);
}
else
{
  http_response_code(404);
}


?>