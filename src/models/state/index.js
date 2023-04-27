import SearchState from './SearchState';
import SPARQLState from './SPARQLState';
import TreeViewState from './TreeViewState';

export default function parseState(plainObject) {
  switch (plainObject.method) {
    case 'search':
      return SearchState.of(plainObject);
    case 'sparql':
      return SPARQLState.of(plainObject);
    case 'treeview':
      return TreeViewState.of(plainObject);
    default:
      return null;
  }
}
