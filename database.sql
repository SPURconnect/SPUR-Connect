
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
	"email" CHARACTER VARYING (255) NOT NULL,
    "photo" VARCHAR (350),
    "industry_id" INT REFERENCES "industry" (id) ON DELETE CASCADE NOT NULL,
    "facebook" VARCHAR (255),
    "linkedin" VARCHAR (255),
    "twitter" VARCHAR (255),
    "youtube" VARCHAR (255),
    "instagram" VARCHAR (255),
    "portfolio" VARCHAR (255),
    "location_city" VARCHAR (100) NOT NULL,
    "location_zip" VARCHAR (15) NOT NULL,
    "location_state" VARCHAR (25) NOT NULL,
    "availability" BOOLEAN DEFAULT true,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "first_name" VARCHAR (40) NOT NULL,
    "last_name" VARCHAR (40) NOT NULL,
    "about_me" VARCHAR (5000)
);

CREATE TABLE "user_messages" (
    "id" SERIAL PRIMARY KEY,
    "content" VARCHAR (400) NOT NULL,
    "sender_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "recipient_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE "user_meetings" (
    "id" SERIAL PRIMARY KEY,
    "summary" VARCHAR (255),
    "meetup_location" VARCHAR (255) NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE  NOT NULL,
    "meeting_title" VARCHAR (255) NOT NULL,
    "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "meeting_notes" VARCHAR (1000)
);

CREATE TABLE "meeting_uploads"(
	"id" SERIAL PRIMARY KEY,
	"image_url" VARCHAR (255) NOT NULL,
	"meeting_id" INT REFERENCES "user_meetings" (id) ON DELETE CASCADE NOT NULL,
 	"image_title" VARCHAR (80) NOT NULL,
  "user_id" INT REFERENCES "user" (id) ON DELETE CASCADE
);

-- dummy users! all passwords '1234'
INSERT INTO "user" ("username", "password")
VALUES
('testuser0', '$2a$10$JElypO6zB15H59KVSsc5R.a6k8Y3PS8qlPQ29H79zUbmEjj6dAaom'),
('testUser1', '$2a$10$abmyEv9kcY3wm7CwhIQ9fu8DvwOZnAqDbLybetoHl7N5FzrfaLAPO'),
('testUser2', '$2a$10$cbD7IpSAhKbsVckG3AUh0.SloLK9aM4tIom.W1KfINd1t4p1vyrie'),
('testUser3', '$2a$10$47ix/4rxZXU5uppu2UtQfuCmB7F1oyFoKuzeOlxpvq62rWaac3C22'),
('testUser4', '$2a$10$ttWC3MHHpVYSO1npEPVcMu6G3p8d8y9Cravau9ArZ9ptMfGWzAoLO'),
('testUser5',  '$2a$10$8hgUv.nEk2jo5C0ghtEBPeabN2RvwHriBsYy02WTfSq7YL2T6doMW'),
('spuraccount1', '$2a$10$J0P0SDSiUWGQakF4uhg1jeZMuaBS/zl2IeKwTIlID4q5cNdF5FRIi'),
('spuraccount2', '$2a$10$joK9ZMQ3P8.yceCz7Lowd.Ej2scsHdIMojx/55G5dfV.t0hPjm7Ei'),
('spuraccount3', '$2a$10$BZUm.TtuWJTuH1wxqXEqf..GCWENl21vr2xBxx7h4LLvogkKirXdq'),
('spuraccount4', '$2a$10$gn7g.vygjPagSPYXGIbcqe6EZMlq2IpUbI/bg3Ip4cjXZBajWIODq'),
('spuraccount5', '$2a$10$i7T3b1XpcdWN8EEsMlzh4eOWzhDQA5rPhLiaAWhRjobKj9UC4QNqa'),
('lovejazz1', '$2a$10$r/46mt1V/RL2BKCdGOo5geUkDr6fM.CHWvDYbTB4jAu6xnhfP0z36'),
('lovejazz2', '$2a$10$IuAeaWvQi8Cx77F11kF7.OioogedAKbxyQiNDONSfC/ylr6../4pm'),
('lovejazz3', '$2a$10$C8J/a84uCfzI9oiIzHVgBO9GG5Qh0j4m8JoQTSBVeRTWKniCfWFO2'),
('lovejazz4', '$2a$10$iNl8tbNcBWhQEdKW/Ow4R.L3rOLvAPmax859MGL.sIewW4zV.6ee6'),
('coffeerules1', '$2a$10$B9JOkipxHJxmXtBCKUvEkeHc1rxd5HWrRHBi1Oamamod5E8TUaFqS'),
('coffeerules2', '$2a$10$GwvaI6AciqCi88o/Dxpt7e/rUr.t/CEmU5r./E7hDVb86Kpn1WC2a'),
('coffeerules3', '$2a$10$rvh3lVvO7bUtcDvgWpynXeuCG0YwfTWLmElVgfnp6wXsNObxJ6UUu'),
('coffeerules4', '$2a$10$zpBytjHDpn9h.nDBuN8RoedE477JBnjOEBxccdh79JgKgJru1A50y'),
('coffeerules5', '$2a$10$oRyc0w4Q1S5bSbnuoDaoMuNaQ2rsfWPpMGA/gd7vrTbTl6fnGTzIm'),
('techuser1', '$2a$10$J0P0SDSiUWGQakF4uhg1jeZMuaBS/zl2IeKwTIlID4q5cNdF5FRIi'),
('techuser2', '$2a$10$joK9ZMQ3P8.yceCz7Lowd.Ej2scsHdIMojx/55G5dfV.t0hPjm7Ei'),
('techuser3', '$2a$10$BZUm.TtuWJTuH1wxqXEqf..GCWENl21vr2xBxx7h4LLvogkKirXdq'),
('techuser4', '$2a$10$gn7g.vygjPagSPYXGIbcqe6EZMlq2IpUbI/bg3Ip4cjXZBajWIODq'),
('techuser5', '$2a$10$i7T3b1XpcdWN8EEsMlzh4eOWzhDQA5rPhLiaAWhRjobKj9UC4QNqa'),
('tealover1', '$2a$10$B9JOkipxHJxmXtBCKUvEkeHc1rxd5HWrRHBi1Oamamod5E8TUaFqS'),
('tealover2', '$2a$10$GwvaI6AciqCi88o/Dxpt7e/rUr.t/CEmU5r./E7hDVb86Kpn1WC2a'),
('tealover3', '$2a$10$rvh3lVvO7bUtcDvgWpynXeuCG0YwfTWLmElVgfnp6wXsNObxJ6UUu'),
('tealover4', '$2a$10$zpBytjHDpn9h.nDBuN8RoedE477JBnjOEBxccdh79JgKgJru1A50y'),
('justinC', '$2a$10$gn7g.vygjPagSPYXGIbcqe6EZMlq2IpUbI/bg3Ip4cjXZBajWIODq'),
('jHorton', '$2a$10$i7T3b1XpcdWN8EEsMlzh4eOWzhDQA5rPhLiaAWhRjobKj9UC4QNqa'),
('kBrown', '$2a$10$B9JOkipxHJxmXtBCKUvEkeHc1rxd5HWrRHBi1Oamamod5E8TUaFqS'),
('whoguy24', '$2a$10$GwvaI6AciqCi88o/Dxpt7e/rUr.t/CEmU5r./E7hDVb86Kpn1WC2a'),
('cLimesand', '$2a$10$zpBytjHDpn9h.nDBuN8RoedE477JBnjOEBxccdh79JgKgJru1A50y');

INSERT INTO "industry" ("industry_name") 
VALUES 
('Software Engineer'),
('Sales'),('Healthcare'),('Manufacturing'),('Finance'),('Agriculture'), ('Information Technology'),('Automobile Manufacturing'), ('Telecommunication'), ('Food Industry'), ('Cannabis Industry'), ('Online Conferencing Industry'), ('Online Dating Industry'), ('HR & Recruitment Services'), ('Real Estate'), ('Apparel Manufacturing'), ('Tourism'), ('Entertainment');

-- dummy data for user profiles, need to make users first to see these
INSERT INTO "profiles" ("first_name", "last_name","photo", "email", "industry_id", "facebook", "linkedin", "twitter", "youtube", "instagram", "portfolio", "location_city", "location_zip", "location_state", "availability","about_me", "user_id")
VALUES
('Michael', 'Huso', 'https://media-exp1.licdn.com/dms/image/C4E03AQHHh-WRQR1J6Q/profile-displayphoto-shrink_800_800/0/1639598986851?e=1649894400&v=beta&t=Ni5lrCFvVUNGebUBZ5tTFR8WOVxWoovoYw1L33kNVmA','test1@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Mounds View', 55112, 'Minnesota', true, 'I like stuff and other stuff', 1),
('Vic', 'Lees','https://ca.slack-edge.com/T4402UEHM-U02ELEXFWMD-874cb075b0ca-192', 'test2@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 2),
('Joe', 'Allen','https://media-exp1.licdn.com/dms/image/C4D03AQE1kY4-im8Mqw/profile-displayphoto-shrink_800_800/0/1604591310702?e=1649894400&v=beta&t=HtZxjMRcmDTVSjapam4vL428WjcMgfeAkQAZ-3R4Cfc', 'test3@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 3),
('Kayla', 'Mir', 'https://i.imgur.com/xbNYDQm.jpg', 'test4@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',4),
('Nicholas', 'Ilacqua', 'https://media-exp1.licdn.com/dms/image/D5635AQG6AQfgwoOjYA/profile-framedphoto-shrink_800_800/0/1643039736313?e=1644339600&v=beta&t=VSxU_p4WMRXPLY3qS16d5jNit1LBIKonCOJsalTY_j0', 'test5@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',  5),
('Duncan', 'Nielsen', 'https://media-exp1.licdn.com/dms/image/C5103AQFPCPSPUSF63w/profile-displayphoto-shrink_800_800/0/1516847683228?e=1648684800&v=beta&t=Md2_WFzOlbaA8s6RrDDR4MACwISNowrQJyhERp7kfL0', 'test6@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 6),
('Mary', 'Cooper', 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg','test1@aol.com', 13, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Mounds View', 55112, 'Minnesota', true, 'I like stuff and other stuff', 7),
('Taylor', 'Benjamin','https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg', 'test2@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 8),
('Brittany', 'Berry','https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg', 'test3@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 9),
('Amanda', 'Chan', 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg', 'test4@aol.com', 9, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 10),
('Amanda', 'Williams', 'https://images.pexels.com/photos/3981337/pexels-photo-3981337.jpeg', 'test5@aol.com', 9, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',  11),
('Thomas', 'Ramos', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 'test6@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 12),
('Brooke', 'McCarty', 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg','test1@aol.com', 5, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Mounds View', 55112, 'Minnesota', true, 'I like stuff and other stuff', 13),
('Matthew', 'Hudson','https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'test2@aol.com', 2, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 14),
('Jeffrey', 'Carlson','https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg', 'test3@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 15),
('Jason', 'Larson', 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg', 'test4@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 16),
('Jessica', 'Wu', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'test5@aol.com', 1, '', 'https://www.linkedin.com/', 'https://www.twitter.com/', '', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'Hey everyone! My name is Jessica and I work at Optum as a Front End Developer. At Optum we work closely as a group to ensure success. There we develop clean professional interfaces for users to handle all of their healthcare needs. I love networking and meeting new people in my industry, lets connect!',  17),
('Michele', 'Gomez', 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg', 'test6@aol.com', 6, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 18),
('Adrienne', 'Dunn', 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg','test1@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Mounds View', 55112, 'Minnesota', true, 'I like stuff and other stuff', 19),
('Caleb', 'Chandler', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', 'test2@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 20),
('David', 'Jones', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'test3@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 21),
('Angela', 'Lin', 'https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg', 'test4@aol.com', 4, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 22),
('Richard', 'Martin', 'https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg', 'test5@aol.com', 5, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',  23),
('Kyle', 'Garner', 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg', 'test6@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 24),
('Austin', 'Gonzales', 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg', 'test3@aol.com', 7, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true,'I like stuff and other stuff', 25),
('Paul', 'James', 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg', 'test4@aol.com', 4, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff', 26),
('Michael', 'Cohen', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', 'test5@aol.com', 5, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 55407, 'Minnesota', true, 'I like stuff and other stuff',  27),
('John', 'Mitchell', 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg', 'test6@aol.com', 6, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 28),
('Kevin', 'Porter', 'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg', 'test6@aol.com', 6, 'https://www.facebook.com/', 'https://www.linkedin.com/', 'https://www.twitter.com/', 'https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.github.com', 'Eden Prairie', 55347, 'Minnesota', true, 'I like stuff and other stuff', 29),
('Justin', 'Cummings', 'https://i.imgur.com/R9Q3cWu.png', 'test6@aol.com', 1, 'https://www.facebook.com/', 'https://www.linkedin.com/in/justinlcummings/', 'https://www.twitter.com/', '', '', 'https://www.github.com', 'Shawnee', 66203, 'Kansas', true, 'Think of Seth Rogen, now imagine him better looking, taller and longer hair.', 30),
('Jerome', 'Horton', 'https://media-exp1.licdn.com/dms/image/C4E03AQE6gAhT50qaNA/profile-displayphoto-shrink_200_200/0/1641672625792?e=1649894400&v=beta&t=r_U4ZVJ4tPERRGsBWw1JchQnbp1H00MQoJkBOy8EqHk', 'test3@aol.com', 1, '', 'https://www.linkedin.com/in/jerome-d-horton/', '', '', 'https://www.instagram.com/', 'https://www.github.com', 'Minneapolis', 91210, 'Minnesota', true,'Food & Wine Connoisseur, lover of Fine Art and Sports. Die-hard Manchester United Fan. Catch me if you can!', 31),
('Kelsey', 'Brown', 'https://media-exp1.licdn.com/dms/image/D4E35AQHpTp-1p5BuPA/profile-framedphoto-shrink_200_200/0/1643668883250?e=1644703200&v=beta&t=oq_-VMi8c_WVNFqNpPIqIjsVlI29KLDh-9KIdL0lLUw', 'test4@aol.com', 1, 'https://www.facebook.com/kelsey.brown.9809/', 'https://www.linkedin.com/in/kelsey-brown-3a3792a8/', '', '', '', 'https://www.github.com', 'Brooklyn Park', 55444, 'Minnesota', true, 'I love to grow and learn which is why I made the transition from working in education to becoming a software developer. I wanted to develop new skills and I enjoy the daily problem-solving that is involved in development.', 32),
('Warren', 'O Brien', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', 'test5@aol.com', 1, '', 'https://www.linkedin.com/in/warren-obrien/', 'https://www.twitter.com/', '', '', 'https://www.github.com', 'Eau Claire', 54701, 'Wisconsin', true, 'People-Centered Web Developer and Cheeseburger Connoisseur.',  33),
('Claire', 'Limesand', 'https://media-exp1.licdn.com/dms/image/D4E35AQHR5b_6-DT1dg/profile-framedphoto-shrink_200_200/0/1641395771338?e=1644703200&v=beta&t=dVGdm_WiLUAiGe-Al7ZRnkAN05J_ypK5pBfeqMwEf64', 'test6@aol.com', 1, '', 'https://www.linkedin.com/in/claire-l-a47b6a225/', '', '', '', 'https://www.github.com', 'Lawrence', 66044, 'Kansas', true, 'I’m a green tea fueled puzzle-solver and self-improver with a commitment to details and deadlines who took a risk and changed careers to pursue a role in tech. I see the opportunity in mistakes and the potential in successes.', 34);

-- dummy data for meetings
INSERT INTO "user_meetings" ("summary", "meetup_location", "date", "meeting_title", "user_id", "participant_id")
VALUES
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Vic', '1', '2'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Joe', '1', '3'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Kayla', '1', '4'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Nicholas', '1', '5'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Duncan', '1', '6'),
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Michael', '2', '1'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Nicholas', '2', '5'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Duncan', '2', '6'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Kayla', '2', '4'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Joe', '2', '3'),
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Michael', '3', '1'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Nicholas', '3', '5'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Duncan', '3', '6'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Kayla', '3', '4'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Vic', '3', '2'),
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Michael', '4', '1'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Nicholas', '4', '5'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Duncan', '4', '6'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Kayla', '4', '3'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Vic', '4', '2'),
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Michael', '5', '1'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Kayla', '5', '4'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Duncan', '5', '6'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Kayla', '5', '3'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Vic', '5', '2'),
('Worked on files for app', 'Coffee Shop Downtown Minneapolis', '2022-02-06T12:18:26.392Z', 'Meeting w/ Michael', '6', '1'),
('Met at coffee shop about new prototype', 'Coffee Shop Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Kayla', '6', '4'),
('Met for doc review', 'Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Duncan', '6', '5'),
('Talked about dinosaurs', 'Goldmedal Park', '2022-02-15T20:12:26.392Z', 'Meeting w/ Kayla', '6', '3'),
('We definitely worked, definitely', 'The Mall of America', '2022-02-11T22:10:26.392Z', 'Meeting w/ Vic', '6', '2'), 
('Worked on files for new app', 'Apiary Coworking Space', '2022-02-06T21:18:26.392Z', 'Meeting w/ Adrienne', '17', '19'),
('Took pictures of the new prototype for the meeting next week', 'Fueled Collective - Downtown', '2022-02-07T15:16:26.392Z', 'Meeting w/ Angela', '17', '22'),
('Short meeting for networking', 'WeWork Office', '2022-02-03T22:10:26.392Z', 'Meeting w/ Taylor', '17', '8'),
('Went over taxes for new office building', 'Coffee Shop on 2nd Ave Downtown Minneapolis', '2022-02-10T20:12:26.392Z', 'Meeting w/ Brooke', '17', '13'),
('Planning on document review', 'CommonGrounds Workplace', '2022-02-15T23:45:26.392Z', 'Meeting w/ Richard', '17', '23'),
('Fleshed out my understanding on Information Tech', 'Spaces Office', '2022-02-05T22:30:26.392Z', 'Meeting w/ Austin', '17', '25');

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
('Lets talk business ideas.', 2, 6, '2022-01-27 02:24:04-06'),
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
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 3, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 4, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 6, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 7, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 11, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 12, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 16, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 2, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 1, '2022-02-11 02:24:15-06')
('Doing a survey of new software engineers: What have you done to build your skills in the past two months?', 17, 5, '2022-02-11 02:24:15-06')
('Built a new project in three.js', 7, 17, '2022-02-12 01:13:15-06')
('A python web-scraper that collects NFTs', 1, 17, '2022-02-12 01:11:15-06')
('Built dummy data for a group project!', 4, 17, '2022-02-12 01:35:15-06')
('I took a new course on legacy PHP', 5, 17, '2022-02-12 01:13:15-06')
('I studied how to build informational youtube videos ', 11, 17, '2022-02-12 01:13:15-06')
('I havent done anything! OH no!', 12, 17, '2022-02-12 01:13:15-06')
('Built a server in my house to host all my projects', 2, 17, '2022-02-12 01:13:15-06')
('Tackling code challenges in C# to get a sense of the syntax', 3, 17, '2022-02-12 01:13:15-06')
('Every week a new solo project', 6, 17, '2022-02-12 01:13:15-06')
('Shell scripting some local automations', 16, 17, '2022-02-12 01:13:15-06')
