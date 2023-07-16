import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ButtonLink from '@/components/links/ButtonLink';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <section className='mb-40'>
        <div className="container text-center">
          <h1 className='mb-6 text-4xl md:text-5xl'>Page not found.</h1>
          <ButtonLink href="/">Go to Homepage</ButtonLink>
        </div>
      </section>
      
    </Layout>
  );
}
