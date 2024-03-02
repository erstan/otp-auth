# otp-auth

**Documentation**: https://erstan.github.io/otp-auth/

### Environment variables 
Specify the following environment variables in `config.env`
```
MONGO_URI=<URI of your Mongo database>
NODE_ENV=<development or production>
PORT=<Backend port>
MAIL_USERNAME=<Service email for sending OTPs>
MAIL_PASSWORD=<Service email account password>
OAUTH_CLIENT_ID=<Gmail API Client Id>
OAUTH_CLIENT_SECRET=<Gmail API Client Secret>
OAUTH_REFRESH_TOKEN=<Gmail API Refresh Token>
JWT_SECRET_KEY=<Self-declared secret key for JWT>
JWT_EXPIRY_DURATION=<Expiry duration of the JWT>
OTP_TTL_DURATION=<Expiry duration of the OTP>
FAILED_FILE_RECORD_RETENTION_PERIOD=<Retention period for file records in the
database whose upload to the server file system failed>
```
