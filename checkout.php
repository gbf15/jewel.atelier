<?php
// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$address = $data['address'];
$items = json_encode($data['items']);  // You may need to customize this to store each item individually
$totalPrice = $data['totalPrice'];

// Connect to Access database
$dsn = "DRIVER={Microsoft Access Driver (*.mdb, *.accdb)}; DBQ=C:\Users\Admin\Documents\jewell.accdb";
$connection = odbc_connect($dsn, "", "");

if ($connection) {
    // Insert data into Access table
    $query = "INSERT INTO Orders (Name, Address, Items, TotalPrice) VALUES ('$name', '$address', '$items', '$totalPrice')";
    $result = odbc_exec($connection, $query);

    if ($result) {
        echo "Order successfully added!";
    } else {
        echo "Failed to add order.";
    }
    odbc_close($connection);
} else {
    echo "Connection failed.";
}
?>
