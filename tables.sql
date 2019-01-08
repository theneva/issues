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
    summary text not null,
    previous_issue_id integer references issue(id),
    next_issue_id integer references issue(id)
);

insert into issue (
    name,
    released,
    summary,
    previous_issue_id,
    next_issue_id
) values
    ('Release 1, story 3', '2018-04-13', 'Some summary', null, null),
    ('Release 2, story 1', '2018-05-22', 'Some other summary', null, null),
    ('Release 3, story 2', '2018-07-11', 'Yet another summary', null, null);

update issue set previous_issue_id = null, next_issue_id = 3    where id = 2;
update issue set previous_issue_id = 2,    next_issue_id = 1    where id = 3;
update issue set previous_issue_id = 3,    next_issue_id = null where id = 1;

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
