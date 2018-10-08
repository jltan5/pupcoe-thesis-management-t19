CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80),
  "email" VARCHAR(80),
  "first_name" VARCHAR(80),
  "last_name" VARCHAR(80),
  "usertype" VARCHAR(80),
  "isadmin" VARCHAR(80),
  "password" VARCHAR(20)
);

CREATE TABLE "classes" (
  "id" SERIAL PRIMARY KEY,
  "class_name" VARCHAR(80),
  "adviser" VARCHAR(80),
  "student_id" VARCHAR(80)
);


insert into users (username, email, first_name, last_name, isadmin, password) values ('jltan5', 'tanjohnloyd3@gmail.com', 'John Loyd', 'Tan', 'Yes', 'team19password');
