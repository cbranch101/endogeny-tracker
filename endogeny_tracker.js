if (Meteor.isClient) ***REMOVED***
  Template.hello.greeting = function () ***REMOVED***
    return "Welcome to endogeny_tracker.";
  ***REMOVED***;

  Template.hello.events(***REMOVED***
    'click input' : function () ***REMOVED***
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        
        console.log("You pressed the button");
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

if (Meteor.isServer) ***REMOVED***
  Meteor.startup(function () ***REMOVED***
    // code to run on server at startup
  ***REMOVED***);
***REMOVED***
