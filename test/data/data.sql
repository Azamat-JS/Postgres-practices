create database transactions

\c transactions

create table fav(

)

create table account(
    id serial primary key,
    email varchar(128) unique,
    created_at DATE not null default now(),
    updated_at DATE not null default now(),
    primary key(id)
);

create table post(
    id serial primary key,
    title varchar(128) unique not null,
    content text,
    account_id integer references account(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table comment(
    id serial primary key,
    content text not null,
    account_id integer references account(id) on delete cascade,
    post_id integer references account(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table fav(
    id serial primary key,
    oops text,
    post_id integer references post(id) on delete cascade,
    account_id integer references account(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique(post_id, account_id)
);
////////////////////////////////////////////////////////////

create table artist(
    id serial primary key,
    name varchar(128) not null
);

create table album(
    id serial primary key,
    title varchar(128) unique,
    artist_id integer references artist(id) on delete cascade
);

create table genre (
    id serial primary key,
    name varchar(128) not null
);

create table track(
    id serial primary key,
    title varchar(128) not null,
    len integer, rating integer, count integer,
    album_id integer references album(id) on delete cascade,
    genre_id integer references genre(id) on delete cascade
);

insert into artist(name) values('Bek Ju');
insert into artist(name) values('ok pu');

insert into album (title, artist_id) values('hey', 2);
insert into album (title, artist_id) values('bey', 1);

insert into genre (name) values('huk');
insert into genre (name) values('buk');

insert into track (title, rating, len, count, album_id, genre_id) values('bon', 5, 234, 0, 2, 1);
insert into track (title, rating, len, count, album_id, genre_id) values('jon', 5, 123, 0, 2, 1);
insert into track (title, rating, len, count, album_id, genre_id) values('kon', 5, 532, 0, 1, 2);
insert into track (title, rating, len, count, album_id, genre_id) values('son', 5, 234, 0, 1, 2);

select album.title, artist.name from album join artist on album.artist_id = artist.id;

select album.title, album.artist_id, artist.id, artist.name from album inner join artist on album.artist_id = artist.id;

select track.title, track.genre_id, genre.id, genre.name from track cross join genre;

select track.title, genre.name from track join genre on track.genre_id = genre.id;

select track.title, artist.name, album.title, genre.name from track
join genre on track.genre_id = genre.id
join album on track.album_id = album.id
join artist on album.artist_id = artist.id;

