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
  if (trim($request->exercise) == '') {
    return http_response_code(400);
  }

  // Sanitize.
  $exercise = mysqli_real_escape_string($con, trim($request->exercise));
  $notes = mysqli_real_escape_string($con, trim($request->notes));
  $weight = filter_var($request->weight, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
  $sets = filter_var($request->sets, FILTER_SANITIZE_NUMBER_INT);
  $reps = filter_var($request->reps, FILTER_SANITIZE_NUMBER_INT);

  // Update.
  $sql = "UPDATE `workouts` SET `exercise`='$exercise',`weight`='$weight', `sets`='$sets', `reps`='$reps', `notes`='$notes' WHERE `nKey` = '{$id}' LIMIT 1";

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