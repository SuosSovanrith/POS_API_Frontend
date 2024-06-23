<?php

session_start();

if(isset($_POST['message']) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['photo']) && isset($_POST['position_name']) && isset($_POST['user_id']) ){

    $_SESSION['auth'] = true;
    $_SESSION['message'] = $_POST['message'];
    $_SESSION['type'] = "success";
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['photo'] = $_POST['photo'];
    $_SESSION['position_name'] = $_POST['position_name'];
    $_SESSION['user_id'] = $_POST['user_id'];

}

?>