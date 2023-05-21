CREATE TABLE "list"(
    "id" SERIAL,
    "task" varchar(256)
    "complete" BOOLEAN
    
);
INSERT INTO "list" ("task", "complete")
VALUES ('Study', 'yes'),
        ('Workout', 'no')