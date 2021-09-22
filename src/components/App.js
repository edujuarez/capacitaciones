import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout user='polo'>
        <Switch>
            <Route exact path='/' component="jelouu"/>

        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;