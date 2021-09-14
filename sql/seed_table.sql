INSERT INTO users (firstname ,lastname ,email, password) 
VALUES
('bhagyashree', 'shakrawar', 'bhagyashree@gmail.com', '1227'),
('pooja', 'rao', 'pooja@gmail.com', '1227'),
('riddhish', 'shakrawar', 'riddhish@gmail.com', '1227');


INSERT INTO schedules(users_id, day, start_time, end_time) 
VALUES
('1', 'MONDAY', '9:00AM', '11:00AM'),
('2', 'TUESDAY', '9:00AM', '11:00AM'),
('3', 'Wednesday', '9:00AM', '11:00AM');