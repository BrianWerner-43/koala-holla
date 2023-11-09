CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150) NOT NULL,
	"gender" VARCHAR(6) NOT NULL,
	"age" INT,
	"readyToTransfer" BOOLEAN,
	"notes" VARCHAR(250)
);

INSERT INTO "koalas" 
	("name", "gender", "age", "readyToTransfer", "notes") 
VALUES 
	('Scotty', 'M', 4, TRUE, 'Born in Guatemala'), 
	('Jean', 'F', 5, TRUE, 'Allergic to lots of lava'), 
	('Ororo', 'F', 7, FALSE, 'Loves listening to Paula (Abdul)'), 
	('Logan', 'M', 15, FALSE, 'Loves the sauna'), 
	('Charlie', 'M', 9, TRUE, 'Favorite band is Nirvana'), 
	('Betsy', 'F', 4, TRUE, 'Has a pet iguana')
;
