import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { CharacterSummaryType } from './types';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  characters: CharacterSummaryType[];
};

class Characters extends React.PureComponent<Props, State> {
  state: State = {
    loading: true,
    characters: [],
  };

  componentDidMount() {
    fetch('/api/characters')
      .then(res => res.json())
      .then(characters => this.setState({ loading: false, characters }));
  }

  render() {
    const { loading, characters } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <>
        <h1>Characters</h1>
        <ul>
          {characters.map(character => (
            <li key={`character-${character.id}`}>
              <Link to={`/characters/${character.id}`}>
                {JSON.stringify(character)}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Characters;
