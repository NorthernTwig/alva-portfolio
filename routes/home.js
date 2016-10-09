'use strict'

const router = require('express').Router()


router.route( '/' )
  .get(( req, res ) => {
    res.render('home')
  })

module.exports = router

/*
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '298950380489156',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
*/
