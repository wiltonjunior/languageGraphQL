var passport = require("passport");
var passportHTTP = require("passport-http");

module.exports = function () {

   var strategy = new passportHTTP.BasicStrategy(function (email,senha,done) {
       if(email=="admin"&&senha=="1234") {
          return done(null,{'email' : 'admin','senha' : '1234'})
       }
       else {
          return done(null,false);
       }
   })

   passport.use(strategy);


   return {
      initialize : function () {
         return passport.initialize();
      },
      authenticate : function () {
         return passport.authenticate("basic",{session : false});
      }
   }
}
