$("#submit").on("click", function(event) {
    event.preventDefault();
    const newUser = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        password: $("#password").val(),
        email: $("#email").val()
    };

    console.log(newUser);
    $.post("/api/register", newUser, function(data) {
        console.log(data);
    });
});

// Need to create a event listerner to get login information
// elements
