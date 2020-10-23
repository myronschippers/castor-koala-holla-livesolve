CREATE TABLE "koalas" (
	"id" serial primary key,
	"name" varchar(80) not null,
	"gender" varchar(1) not null,
	"age" integer not null,
	"ready_to_transfer" boolean not null,
	"notes" varchar(200)
);

INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', 4, TRUE, 'Born in Guatemala'),
('Jean', 'F', 5, TRUE, 'Allergic to lots of lava'),
('Ororo', 'F', 7, FALSE, 'Loves listening to Paula (Abdul)'),
('Logan', 'M', 15, FALSE, 'Loves the sauna'),
('Charlie', 'M', 9, TRUE, 'Favorite band is Nirvana'),
('Betsy', 'F', 4, TRUE, 'Has a pet iguana');