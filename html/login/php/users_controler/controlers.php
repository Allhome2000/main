<?php
session_start();

// نمونه‌ای از دیتابیس کاربران
$users = [
    ["username" => "user1", "password" => "pass1"],
    ["username" => "user2", "password" => "pass2"],
    ["username" => "user3", "password" => "pass3"]
];

// صفحه ورود کاربر
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // بررسی صحت اطلاعات ورود کاربر
    foreach ($users as $user) {
        if ($user["username"] == $username && $user["password"] == $password) {
            $_SESSION["username"] = $username;
            header("Location: dashboard.php");
            exit();
        }
    }

    $error = "Invalid username or password";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form method="POST" action="">
        <label>Username:</label>
        <input type="text" name="username" required><br>

        <label>Password:</label>
        <input type="password" name="password" required><br>

        <input type="submit" value="Login">
    </form>
    <?php if (isset($error)) { echo $error; } ?>
</body>
</html>