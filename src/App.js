import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const fullQueryGql = gql`
  query ErrorTemplate {
    cart {
      id
      items {
        id
        someValue
      }
    }
  }
`
const brokenMutationGql = gql`
  mutation mockMutation {
    changeItems {
      id
      items {
        id
      }
    }
  }
`
const okayMutationGql = gql`
  mutation mockMutation {
    changeItems {
      id
      items {
        id
        someValue
      }
    }
  }
`

class App extends Component {
  render() {
    const { fullQuery: { loading, error, cart }, brokenMutation, okayMutation } = this.props;
    const prettyQueryData = JSON.stringify({loading, error, cart}, null, 2);

    return (
      <main>
        <pre>
          {prettyQueryData}
        </pre>
        <button onClick={() => brokenMutation()}>Breaks data</button>
        <button onClick={() => okayMutation()}>Works fine (and fixes data, if broken)</button>
      </main>
    );
  }
}

export default compose(
  graphql(fullQueryGql, {name: 'fullQuery'}),
  graphql(brokenMutationGql, {name: 'brokenMutation'}),
  graphql(okayMutationGql, {name: 'okayMutation'}),
)(App);
