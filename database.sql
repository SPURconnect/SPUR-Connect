
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
    "password" VARCHAR (1000) NOT NULL,
    "email" CHARACTER VARYING (1000) NOT NULL,
    "photo" VARCHAR (1000),
    "industry_id" INT REFERENCES "industry" (id) ON DELETE CASCADE NOT NULL,
    "facebook" VARCHAR (1000),
    "linkedin" VARCHAR (1000),
    "twitter" VARCHAR (1000),
    "youtube" VARCHAR (1000),
    "instagram" VARCHAR (1000),
    "portfolio" VARCHAR (1000),
    "location_city" VARCHAR (1000) NOT NULL,
    "location_zip" INTEGER  NOT NULL,
    "location_state" VARCHAR (1000) NOT NULL,
    "availability" BOOLEAN
);

CREATE TABLE "user_messages" (
    "id" SERIAL PRIMARY KEY,
    "content" VARCHAR (80) NOT NULL,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "participan_id" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE "user_meetings" (
    "id" SERIAL PRIMARY KEY,
    "summary" VARCHAR (1000) NOT NULL,
    "meetup_location" VARCHAR (255) NOT NULL,
    "date" VARCHAR (255) NOT NULL,
    "meeting_title" VARCHAR (255) NOT NULL,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "participan_id" INTEGER NOT NULL
);

CREATE TABLE "meeting_uploads"(
	"id" SERIAL PRIMARY KEY,
	"image_url" VARCHAR (255) NOT NULL,
	"meeting_id" INT REFERENCES "user_meetings" (id) ON DELETE CASCADE NOT NULL,
 	"image_title" VARCHAR (80) NOT NULL
);

INSERT INTO "industry" ("industry_name") 
VALUES 
('Software Engineer'),
('Sales'),('Healthcare'),('Manufacturing'),('Finance'),('Agriculture'), ('Information Technology'),('Automobile Manufacturing'), ('Telecommunication'), ('Food Industry'), ('Cannabis Industry'), ('Online Conferencing Industry'), ('Online Dating Industry'), ('HR & Recruitment Services'), ('Real Estate'), ('Apparel Manufacturing'), ('Tourism'), ('Entertainment');

INSERT INTO "user" ("username", "password", "email", "industry_id", "facebook", "linkedin", "twitter", "youtube", "instagram", "portfolio", "location_city", "location_zip", "location_state", "availability")
VALUES
('Michael', '1234', 'test1@aol.com', 1, 'facebook.com/test1', 'linkedin.com/test1', 'twitter.com/test1', 'youtube.com/test1', 'instagram.com/test1', 'test1.com', 'Mounds View', 55112, 'Minnesota', true)
('Kayla', '1234', 'test2@aol.com', 2, 'facebook.com/test2', 'linkedin.com/test2', 'twitter.com/test2', 'youtube.com/test2', 'instagram.com/test2', 'test2.com', 'Minneapolis', 55407, 'Minnesota', true),
('Vic', '1234', 'test3@aol.com', 3, 'facebook.com/test3', 'linkedin.com/test3', 'twitter.com/test3', 'youtube.com/test3', 'instagram.com/test3', 'test3.com', 'Minneapolis', 55407, 'Minnesota', true),
('Joe', '1234', 'test4@aol.com', 4, 'facebook.com/test4', 'linkedin.com/test4', 'twitter.com/test4', 'youtube.com/test4', 'instagram.com/test4', 'test4.com', 'Minneapolis', 55407, 'Minnesota', true),
('Nick', '1234', 'test5@aol.com', 5, 'facebook.com/test5', 'linkedin.com/test5', 'twitter.com/test5', 'youtube.com/test5', 'instagram.com/test5', 'test5.com', 'Minneapolis', 55407, 'Minnesota', true),
('Duncan', '1234', 'test6@aol.com', 1, 'facebook.com/test6', 'linkedin.com/test6', 'twitter.com/test6', 'youtube.com/test6', 'instagram.com/test6', 'test6.com', 'Eden Prairie', 55347, 'Minnesota', true);
