create table Games (id text primary key, player1 text, player2 text, ongoing boolean);
create table Results (id text primary key, hand1 text, hand2 text, winner integer, t timestamp);
create table Players (id text primary key, games integer, wins integer, draws integer, scissors integer, papers integer, rocks integer);