drop table if exists character cascade;
create table character (
    id serial primary key,
    name varchar(255) not null,
    alias varchar(255) not null,
    description text not null
);

insert into character (
    name,
    alias,
    description
) values
    ('Dick Grayson', 'Robin', 'Some dude'),
    ('Bruce Wayne', 'Batman', 'Some other dude'),
    ('Koriand''r', 'Starfire', 'Some Teen Titans person');

drop table if exists issue cascade;
create table issue (
    id serial primary key,
    name varchar(255) not null,
    released date not null,
    summary text not null
);

insert into issue (
    name,
    released,
    summary
) values
    ('Some issue', '2018-04-13', 'Some summary'),
    ('Some other issue', '2018-05-22', 'Some other summary'),
    ('Yet another issue', '2018-07-11', 'Yet another summary');

drop table if exists issue_character cascade;
create table issue_character (
    issue_id integer references issue(id),
    character_id integer references character(id),
    primary key (issue_id, character_id)
);

insert into issue_character (
    issue_id,
    character_id
) values
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 2),
    (3, 1),
    (3, 3);
