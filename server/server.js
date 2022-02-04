const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const userProfile  =require('./routes/userProfile.router');
const editProfile = require('./routes/editProfile.router')
const searchProfilesRouter = require('./routes/searchProfiles.router');
const industriesRouter = require('./routes/industries.router');
const messagesRouter = require('./routes/messages.router');
const meetingsRouter = require('./routes/meetings.router.js');
const uploadsRouter = require('./routes/uploads.router.js');
const singleProfileRouter = require("./routes/singleProfile.router");



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/userProfile', userProfile);
app.use('/api/editProfile', editProfile)
app.use('/api/searchProfiles', searchProfilesRouter);
app.use('/api/industry', industriesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/uploads', uploadsRouter);
app.use("/api/singleProfile", singleProfileRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
