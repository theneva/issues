import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Character } from './types';

type RouteParams = { id: string };
type Props = RouteComponentProps<RouteParams>;
type State = {
  loading: boolean;
  character: Character | null;
};

class SingleCharacter extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    character: null,
  };

  componentDidMount() {
    fetch(`/api/characters/${this.props.id}`)
      .then(res => res.json())
      .then(character => this.setState({ loading: false, character }));
  }

  render() {
    const { loading, character } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    if (character === null) {
      return <div>Something went wrong</div>;
    }

    return (
      <>
        <h1>{character.name}</h1>
        <dl>
          <dt>Alias</dt>
          <dd>{character.alias}</dd>
          <dt>Description</dt>
          <dd>{character.description}</dd>
        </dl>
        <h2>Appears in issues</h2>
        <ul>
          {character.issues.map(issue => (
            <li key={`character-issue-${issue.id}`}>{JSON.stringify(issue)}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default SingleCharacter;
