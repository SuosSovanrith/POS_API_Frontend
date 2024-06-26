$("#SignIn").click(function() {

    fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        withCredentials: true,
        headers: {
        "api_key": "123456",
        "Content-Type": "application/json",
        "Email": $("#Email").val(),
        "Password": $("#Password").val()
        }})
    
    .then((data)=>{
        return data.json();
    })
    .then((objectData)=>{
        console.log(objectData);

        if(objectData.status == 403 || objectData.status == 401){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: objectData.message,
              });
        }

        if(objectData.status == 200){
            $.post('../php/login.php', {
                message:objectData.message, 
                email:objectData.email, 
                name:objectData.name, 
                photo:objectData.photo, 
                position_name:objectData.position_name,
                user_id:objectData.user_id  
            }, function(data) {
                if(data == "Success"){
                    window.location.replace('../views/index.php');
                }
            });
        }
     });

});
