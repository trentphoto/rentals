import * as React from 'react';
import Nav from '../Nav';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        {children}
      </main>

      <Footer />
    </>
  )
}
