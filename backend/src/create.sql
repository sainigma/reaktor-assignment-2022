create table Games (id text primary key, player1 text, player2 text);
create table Results (id text primary key, hand1 text, hand2 text, winner integer, t timestamp);
create table Players (id text primary key, games integer default 0, wins integer default 0, draws integer default 0, scissors integer default 0, papers integer default 0, rocks integer default 0);