import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Layout from './Layout';
import routes from './route';
import { useRoutes } from 'react-router-dom';

function App() {
  const route = useRoutes(routes);

  return (
    <>
      <Layout>
        {route}

      </Layout>
    </>
  );
}

export default App;
