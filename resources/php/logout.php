<?php
    session_start();

        if(isset($_SESSION['auth'])){
            unset($_SESSION['auth']);
            unset($_SESSION['name']);
            unset($_SESSION['email']);
            unset($_SESSION['photo']);
            unset($_SESSION['position_name']);
            unset($_SESSION['user_id']);
            $_SESSION['message'] = "Logged Out Successfully.";
            $_SESSION['type'] = "success";
        }

    header('Location: ../views/login.php');
?>