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

?>