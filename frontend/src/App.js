import React from 'react';
import { Container} from 'react-bootstrap'
import Header from './componets/Header';
import Footer from './componets/Footer';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3' style={{ height: 'calc(100vh - 120px)'}}>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
