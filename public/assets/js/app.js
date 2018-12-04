$('#submit').on('click', function(event){
    event.preventDefault();
    const newUser = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    }

    console.log(newUser);
    $.post('/api/register', newUser, function(data){
        console.log(data);
    })
});



// Need to create a event listerner to get login information