import React from 'react';
import './App.css';
import Content from './components/content/Content';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <Content />
      </section>
      <footer>
        <Footer />
      </footer>
    </>

  );
}

export default App;
