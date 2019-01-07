import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { CharacterSummary } from './types';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  characters: CharacterSummary[];
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
              {JSON.stringify(character)}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Characters;
