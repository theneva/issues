import { Router } from 'express';
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  database: 'rebecca',
});

const router = Router();

router.get('/characters', async (req, res) => {
  const { rows } = await pool.query('select * from character');
  res.json(rows);
});

router.get('/characters/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: characters } = await pool.query(
    'select * from character where id = $1',
    [id],
  );

  if (characters.length === 0) {
    res.sendStatus(404);
    return;
  }

  const character = characters[0];

  const { rows: issues } = await pool.query(
    `
select issue.*
from issue
join
  issue_character on issue_id = issue.id
where
  issue_character.character_id = $1
`,
    [id],
  );

  character.issues = issues;

  res.json(character);
});

router.get('/issues', async (req, res) => {
  const { rows } = await pool.query('select * from issue');
  res.json(rows);
});

router.get('/issues/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: issues } = await pool.query(
    'select * from issue where id = $1',
    [id],
  );

  if (issues.length === 0) {
    res.sendStatus(404);
    return;
  }

  const issue = issues[0];

  const { rows: characters } = await pool.query(
    `
select *
from character
join
  issue_character on issue_character.character_id = character.id
where
  issue_character.issue_id = $1
`,
    [id],
  );

  issue.characters = characters;

  res.json(issue);
});

export default router;
