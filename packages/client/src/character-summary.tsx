import * as React from 'react';
import { Link } from '@reach/router';
import { CharacterSummaryType } from './types';
import './character-summary.css';

type Props = CharacterSummaryType;

const CharacterSummary: React.FunctionComponent<Props> = ({
  id,
  name,
  description,
  alias,
}) => (
  <div className="character-summary">
    <h1 className="character-summary__name">
      <Link to={`/characters/${id}`}>{name}</Link> as {alias}
    </h1>
    {description}
  </div>
);

export default CharacterSummary;
