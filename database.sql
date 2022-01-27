
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
    "porfolio" VARCHAR (1000),
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
('Sales'),('Healthcare'),('Manufacturing'),('Finance'),('Agriculture'), ('Information Technology'),('Food Industry'),('Automobile Manufacturing'), ('Telecommunication'), ('Food Industry'), ('Cannabis Industry'), ('Online Conferencing Industry'), ('Online Dating Industry'), ('HR & Recruitment Services'), ('Real Estate'), ('Apparel Manufacturing'), ('Tourism'), ('Entertainment')
