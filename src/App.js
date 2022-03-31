import "./assets/css/App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import MainComponent from "./MainComponent";
import GlobalContextProvider from "./context/globalContextProvider";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.ss.dev/resource/api" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalContextProvider>
        <div className="App">
          <MainComponent />
        </div>
      </GlobalContextProvider>
    </ApolloProvider>
  );
}

export default App;
