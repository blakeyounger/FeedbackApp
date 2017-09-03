const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

//using .model, one argument means we are fetching something from mongoose, two arguments means we are trying to load something into it.
const User = mongoose.model("users");

//user is the user instance pulled from the database
//serializeUser generates a cookie from the user's googleID
passport.serializeUser((user, done) => {
	//first argument is an error object. null means no error. user.id is the piece of info used to identify the user in followup requests.
	//user.id is not the same as profile.id. 
	//user.id is the string automatically generated by Mongo with the "$oid" key 
	//profile.id is the googleID
	//the user.id ("$oid" key) is used here because if we implement other authentication systems (Facebook, LinkedIn, etc.) the user may not always have a googleID
	done(null, user.id);
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			//.findOne returns a promise 
			User.findOne({ googleID: profile.id })
				//get an indication of when the query has completed
				//existingUser is a model instance of the user that was found
				.then((existingUser) => {
					if (existingUser) {
						//we already have a record of the given profile ID
						//the first argument in the done function is an error placeholder. when it is null, there is no error
						done(null, existingUser)
					} else {
						//add this new user to the database
						//saving to the mongo database is an asynchronous operation
						//must call done() AFTER the user is successfully saved
						//"User" is the first model instance, "user" is the model instance after the new User was saved to the database
						new User({ googleID: profile.id }).save()
							.then(user => done(null, user));
					}
				})
			
		}
	)
);
