<?php

$serverName = "localhost";
$userName = "root";
$password = "";
$databaseName = "cars";

// creating the connection

$connection = mysqli_connect($serverName, $userName, $password, $databaseName);

if(mysqli_connect_errno()){
  echo "Failed to connect!";
  exit();
}

// Query to fetch all rows from the 'cars' table
$sql = "SELECT * FROM car_info";
$result = $connection->query($sql);

// Check if the query returned results
if ($result->num_rows > 0) {
    $carsArray = array();

    while ($row = $result->fetch_assoc()) {
        $carsArray[] = $row;
    }
}

// Outputting data as JSON
header('Content-Type: application/json');
echo json_encode($carsArray);

?>