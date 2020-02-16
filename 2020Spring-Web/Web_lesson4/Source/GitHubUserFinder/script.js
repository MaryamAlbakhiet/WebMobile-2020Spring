function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    const xhttp = new XMLHttpRequest();                         //The XMLHttpRequest object can be used to request data from a web server.
    xhttp.overrideMimeType("application/json");          //method overrides the MIME type returned by the server. This used to force a stream to be treated as json
    xhttp.open('GET', "https://api.github.com/users/"+user, true);
    xhttp.onload=function () {                                 // Do something with the retrieved data ( found in xhttp.response )
        if (xhttp.status == 200)                              //status	200: "OK"
            showUser(JSON.parse(xhttp.responseText));          //turns string into a native JavaScript object
         else {
            noSuchUser(user);
        }

    };
    xhttp.send();                                             //Sends the request to the server (used for GET)
}




function showUser(user) {
    console.log(user)
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#name").text(user.login);
    $(".avatar").html("<img height='250 width='250' src='"+user.avatar_url+"'/>");


    const link = "<a target='_blank' href='" + user.html_url + "'>Click here</a>";


    $(".information").html("<label><u><strong>Detail of the user</strong></strong></u></label>"
        +
        "<br/><br/><label style ='color: red' align='left'>Login Name :</label>"+user.name
        +"<br/><label style ='color: red' align='left'>Login ID :</label>"+user.id
        +"<br/><label style ='color: red' align='left'>Github URL :</label>"+link
        +"<br/><label style ='color: red' align='left'>Repo count :</label>"+ user.public_repos);

    $("#profile").show();                         //show() works on elements hidden with jQuery methods and display
}



function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#name").text("Sorry, The user '"+username+"' does not exist");
    $(".avatar").text('');
    $(".information").html('');
    $("#profile").show();
}



$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        $("#profile").hide();
        let username;
        let response;
        if (e.which === 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status === 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
