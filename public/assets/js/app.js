$("#submit").on("click", function(event) {
    event.preventDefault();
    const newUser = {
        password: $("#suPass").val(),
        username: $("#suUser").val(),
        email: $("#suEmail").val()
    };
    console.log(newUser);

    console.log(newUser);
    $.post("/register", newUser, function(data) {
        console.log(data);
    });
});

// Need to create a event listerner to get login information
// elements
