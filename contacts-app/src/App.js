import { ApolloProvider } from '@apollo/client';
import './App.css';
import { Outlet } from 'react-router-dom';
import { client } from './api/graphql';
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Outlet/>
      </ApolloProvider>
    </div>
  );
}

export default App;
