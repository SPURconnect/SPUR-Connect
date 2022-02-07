
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Name Database spur_connect
CREATE TABLE "industry" (
    "id" SERIAL PRIMARY KEY,
    "industry_name" VARCHAR (80) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "profiles" (
	"id" SERIAL PRIMARY KEY,
	"email" CHARACTER VARYING (1000) NOT NULL,
    "photo" VARCHAR (1000),
    "industry_id" INT REFERENCES "industry" (id) ON DELETE CASCADE NOT NULL,
    "facebook" VARCHAR (1000),
    "linkedin" VARCHAR (1000),
    "twitter" VARCHAR (1000),
    "youtube" VARCHAR (1000),
    "instagram" VARCHAR (1000),
    "portfolio" VARCHAR (1000),
    "location_city" VARCHAR (1000),
    "location_zip" VARCHAR (15) NOT NULL,
    "location_state" VARCHAR (1000) NOT NULL,
    "availability" BOOLEAN DEFAULT true,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "first_name" VARCHAR (1000),
    "last_name" VARCHAR (1000),
    "about_me" VARCHAR (5000)
);

CREATE TABLE "user_messages" (
    "id" SERIAL PRIMARY KEY,
    "content" VARCHAR (80) NOT NULL,
    "sender_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "recipient_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE "user_meetings" (
    "id" SERIAL PRIMARY KEY,
    "summary" VARCHAR (1000),
    "meetup_location" VARCHAR (255) NOT NULL,
    "date" VARCHAR (255) NOT NULL,
    "meeting_title" VARCHAR (255) NOT NULL,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "participant_id" INTEGER NOT NULL
);

CREATE TABLE "meeting_uploads"(
	"id" SERIAL PRIMARY KEY,
	"image_url" VARCHAR (255) NOT NULL,
	"meeting_id" INT REFERENCES "user_meetings" (id) ON DELETE CASCADE NOT NULL,
 	"image_title" VARCHAR (80) NOT NULL,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE
);

INSERT INTO "industry" ("industry_name") 
VALUES 
('Software Engineer'),
('Sales'),('Healthcare'),('Manufacturing'),('Finance'),('Agriculture'), ('Information Technology'),('Automobile Manufacturing'), ('Telecommunication'), ('Food Industry'), ('Cannabis Industry'), ('Online Conferencing Industry'), ('Online Dating Industry'), ('HR & Recruitment Services'), ('Real Estate'), ('Apparel Manufacturing'), ('Tourism'), ('Entertainment');

-- dummy data for user profiles, need to make users first to see these
INSERT INTO "profiles" ("first_name", "last_name","photo", "email", "industry_id", "facebook", "linkedin", "twitter", "youtube", "instagram", "portfolio", "location_city", "location_zip", "location_state", "availability","about_me", "user_id")
VALUES
('Michael', 'Huso', 'https://media-exp1.licdn.com/dms/image/C5103AQFPCPSPUSF63w/profile-displayphoto-shrink_800_800/0/1516847683228?e=1648684800&v=beta&t=Md2_WFzOlbaA8s6RrDDR4MACwISNowrQJyhERp7kfL0','test1@aol.com', 1, 'facebook.com/test1', 'linkedin.com/test1', 'twitter.com/test1', 'youtube.com/test1', 'instagram.com/test1', 'test1.com', 'Mounds View', 55112, 'Minnesota', true,'I like stuff and other stuff', 1),
('Vic', 'Lees','duncan.jpeg', 'test2@aol.com', 2, 'facebook.com/test2', 'linkedin.com/test2', 'twitter.com/test2', 'youtube.com/test2', 'instagram.com/test2', 'test2.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 2),
('Joe', 'Allen','duncan.jpeg', 'test3@aol.com', 3, 'facebook.com/test3', 'linkedin.com/test3', 'twitter.com/test3', 'youtube.com/test3', 'instagram.com/test3', 'test3.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 3),
('Kayla', 'Mir','duncan.jpeg', 'test4@aol.com', 4, 'facebook.com/test4', 'linkedin.com/test4', 'twitter.com/test4', 'youtube.com/test4', 'instagram.com/test4', 'test4.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',4),
('Nicholas', 'Ilacqua','duncan.jpeg', 'test5@aol.com', 5, 'facebook.com/test5', 'linkedin.com/test5', 'twitter.com/test5', 'youtube.com/test5', 'instagram.com/test5', 'test5.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff',  5),
('Duncan', 'Nielsen', 'https://media-exp1.licdn.com/dms/image/C5103AQFPCPSPUSF63w/profile-displayphoto-shrink_800_800/0/1516847683228?e=1648684800&v=beta&t=Md2_WFzOlbaA8s6RrDDR4MACwISNowrQJyhERp7kfL0', 'test6@aol.com', 6, 'facebook.com/test6', 'linkedin.com/test6', 'twitter.com/test6', 'youtube.com/test6', 'instagram.com/test6', 'test6.com', 'Eden Prairie', 55347, 'Minnesota', true,'I like stuff and other stuff', 6);

-- dummy data for meetings
INSERT INTO "user_meetings" ("summary", "meetup_location", "date", "meeting_title", "user_id", "participant_id")
VALUES
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2/1/2022 11:32AM', 'Meeting w/ Vic', '1', '2'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2/1/2022 09:12AM', 'Meeting w/ Joe', '1', '3'),
('Met for doc review', 'Office', '2/3/2022 09:12AM', 'Meeting w/ Kayla', '1', '4');

-- dummy data for conversations
INSERT INTO "public"."user_messages"("content", "sender_id", "recipient_id", "timestamp") 
VALUES
('Hello!', 1, 2, '2022-01-27 02:24:04-06'),
('Oh, Hi.', 2, 1, '2022-01-27 02:24:12-06'),
('Hey stranger', 2, 3, '2022-01-27 02:24:04-06'),
('Don''t ever come to St. Louis again.', 3, 2, '2022-01-27 02:24:17-06'),
('Hello!', 1, 4, '2022-01-27 02:24:04-06'),
('Business talk only', 4, 1, '2022-01-27 02:25:15-06'),
('Cool', 1, 5, '2022-01-27 02:24:04-06'),
('What''s cool? Weird way to start a conversation.', 5, 1, '2022-01-27 02:24:41-06'),
('Dummy message', 1, 6, '2022-01-27 02:24:04-06'),
('Uh.. Rude?', 6, 1, '2022-01-27 02:24:17-06'),
('GIT CONVERSATION INIT', 2, 4, '2022-01-27 02:24:04-06'),
('NPM INSTALL JOKE LULZ', 4, 2, '2022-01-27 02:24:55-06'),
('Up late, St Louis is cold.', 2, 5, '2022-01-27 02:24:04-06'),
('Try minneapolis, dang.', 5, 2, '2022-01-27 02:24:59-06'),
('Let''s talk business ideas.', 2, 6, '2022-01-27 02:24:04-06'),
('Okay, livestream gluten free bread cooking app?', 6, 2, '2022-01-27 02:26:22-06'),
('You try coming up with a bunch of overtures', 3, 4, '2022-01-27 02:24:04-06'),
('I just say ''no, u''', 4, 3, '2022-01-27 02:26:04-06'),
('Simultaneous friend messaging', 3, 5, '2022-01-27 02:24:04-06'),
('Simultaneous friend becoming ', 5, 3, '2022-01-27 02:24:16-06'),
('Quantum message sending', 3, 6, '2022-01-27 02:24:04-06'),
('Quantum message sending', 6, 3, '2022-01-27 02:24:15-06'),
('Quantum message sending', 4, 5, '2022-01-27 02:24:04-06'),
('Quantum message sending', 5, 4, '2022-01-27 02:24:15-06'),
('Quantum message sending', 4, 6, '2022-01-27 02:24:04-06'),
('Quantum message sending', 6, 4, '2022-01-27 02:24:15-06'),
('Quantum message sending', 5, 6, '2022-01-27 02:24:04-06'),
('Quantum message sending', 6, 5, '2022-01-27 02:24:15-06');
