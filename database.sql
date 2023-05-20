CREATE TABLE "list"(
    "id" SERIAL,
    "task" varchar(256)
    
);
INSERT INTO "list" ("task", "complete")
VALUES ('Study', TRUE),
        ('Workout',False )