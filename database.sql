CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80),
  "first_name" VARCHAR(80),
  "last_name" VARCHAR(80),
  "usertype" VARCHAR(80),
  "studentnumber" VARCHAR(80),
  "isadmin" VARCHAR(80),
  "password" VARCHAR(20)
);

CREATE TABLE "classes" (
  "id" SERIAL PRIMARY KEY,
  "class_name" VARCHAR(80),
  "adviser" VARCHAR(80),
  "student_id" VARCHAR(80)
);

insert into users (username, first_name, last_name, isadmin, password, usertype) values ('Gtria', 'Gino', 'Tria', 'Admin', 'admin123', 'Faculty');

insert into users (username, first_name, last_name, isadmin, password, usertype) values ('Csawi', 'Christopher', 'Sawi', 'Regular', '123admin', 'Faculty');

insert into users (username, first_name, last_name, studentnumber, password, usertype) values ('Esomido', 'Ellaine', 'Somido', '2014-04010-MN-0', 'johnloyd', 'Student');
