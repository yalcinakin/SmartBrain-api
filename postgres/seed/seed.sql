BEGIN TRANSACTION;

INSERT into login (hash, email) values ('$2a$10$u2L.HfKwUeGaU02kaJ47E.Vf95rgPGdpUQvS.Z54JYiigIkYDSmj.', 'asd@gmail.com');
INSERT into users (name, email, entries, joined) values ('asd', 'asd@gmail.com', 5, '2018-01-01');

COMMIT;
