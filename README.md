# Single-Resource-Mongo-REST

This is a single resource REST api for writing book reviews.

In a review, bookName is required, which the review itself must be at least 10 characters

To create a new user, POST to localhost:3000/api/signup 
To signin and authenticate user, GET to localhost:3000/api/signin

The username must be unique, and both a username and password are requried.
The password is securely hashed and salted.

Tokens are encrypted using the EAT library.
