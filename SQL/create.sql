create database demo_database;

use demo_database;

create table product(
                        id int not null primary key auto_increment,
                        name varchar(255),
                        price int not null ,
                        description varchar(255)
);