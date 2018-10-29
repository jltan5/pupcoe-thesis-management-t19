CREATE TABLE users (
	id SERIAL PRIMARY KEY, 
	username varchar(30) UNIQUE,
	email varchar(50) UNIQUE,
	password varchar(255), 
	prefix varchar(30),
	first_name varchar(50),
	middle_name varchar(50),
	last_name varchar(50),
	suffix varchar(30),
	student_id varchar(30) UNIQUE,
	phone_number varchar(30),
	user_type varchar(30),
	is_admin boolean DEFAULT false,
	created_date DATE DEFAULT current_date);

INSERT INTO users (username, email, password, first_name, last_name, phone_number, user_type, is_admin) VALUES ('Gtria', 'ginotria@gmail.com', '$2y$10$TolnpuSPmNr1qn/oJTzcf.XMyjvU7dZwuwWZE6kJnr2HN/nun7UfG', 'Gino', 'Tria', '09123456789', 'faculty', 'true');


CREATE TABLE class (
	id SERIAL PRIMARY KEY,
	batch varchar(30),
	section int,
	advisor_id int
);


CREATE TABLE class_cluster (
	id SERIAL PRIMARY KEY,
	student_id int,
	class_id int
);

CREATE TABLE committee (
	id SERIAL PRIMARY KEY,
	faculty_id int,
	batch int
);

CREATE TABLE groups (
	id SERIAL PRIMARY KEY,
	group_number varchar(50),
	class_id int
);

CREATE TABLE group_cluster (
	id SERIAL PRIMARY KEY,
	group_id int,
	member_id int
);

CREATE TABLE thesis (
	id SERIAL PRIMARY KEY,
	group_id int,
	title varchar(100) NOT NULL,
	abstract varchar(500) NOT NULL,
	status varchar(50) NOT NULL,
	comment varchar(255),
	date_created date DEFAULT current_date,
	date_updated date,
	is_main boolean DEFAULT false,
	is_approved boolean DEFAULT false
);