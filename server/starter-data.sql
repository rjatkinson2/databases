use chat;
insert into users (username) values ('andy');
insert into users (username) values ('ryan');

insert into rooms (roomname) values ('loft');

insert into messages (text, id_users, id_rooms) values ('hope this works', (select id from users where username = 'ryan'), (select id from rooms where roomname = 'loft'));
