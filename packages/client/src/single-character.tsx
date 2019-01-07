import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Character } from './types';

type Props = RouteComponentProps;
type State = {
  loading: boolean;
  character: Character | null;
};

class SingleCharacter extends React.PureComponent<Props, State> {
  state: State = {
    loading: false,
    character: null,
  };

  render() {
    return <div>Character</div>;
  }
}

export default SingleCharacter;
