window.fbAsyncInit = function() {
    FB.init({
        appId   : '1745290942403740',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });

};

function fb_login(host){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            getProfile(host, response.authResponse.accessToken);
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });
}

(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());

function getProfile(host, access_token) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email,picture', function(response) {
        console.log('Successful login for: ' + response.name);

        console.log(response);

        $.ajax({
            url:host+'/user',
            type:'post',
            beforeSend: function (request)
            {
                request.setRequestHeader("access-token", access_token);
            },
            data: {
                user_id : response.id,
                email : response.email,
                username : response.name,
                user_picture : response.picture.data.url
            },
            success: function(data){
                console.log(data);
                location.href = host+data.redirect_url;
            }
        });

/*
        var login_form = document.login_form;
        login_form.user_id = response.id;
        login_form.email = response.email;
        login_form.username = response.name;
        login_form.user_picture = response.picture.data.url;
        login_form.action="/board";
        login_form.method="post";
        login_form.submit();*/
    });
}