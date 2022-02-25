<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->exercise) === '')
  {
    return http_response_code(400);
  }
  
  // Sanitize.
  $exercise = mysqli_real_escape_string($con, trim($request->exercise));
  

  // Create.
  $id = $request->id;
  $weight = $request->weight;
  $sets = $request->sets;
  $reps = $request->reps;
  $notes = $request->notes;
  $sql = "INSERT INTO `workouts`(`id`,`exercise`,`weight`,`sets`,`reps`,`notes`,`nKey`) VALUES ('{$id}','{$exercise}','{$weight}','{$sets}','{$reps}','{$notes}', NULL)";
  

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $workout = [
      'nKey' => mysqli_insert_id($con),
	  'id' => $id,
      'exercise' => $exercise,
      'weight' => $weight,
      'sets' => $sets,
      'reps' => $reps,
	  'notes' => $notes
    ];
    echo json_encode($workout);
  }
  else
  {
    http_response_code(422);
  }
}