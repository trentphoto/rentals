import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import GrayBarSection from '@/components/layout/GrayBarSection';
import { classesForCustomButtons } from '@/components/links/ButtonLink';

export default function FAQPage() {
  const base = process.env.NEXT_PUBLIC_API_URL

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <section>
        <div className="container">
          <GrayBarSection className='p-8 md:p-20 text-center'>
            <h1>Contact Us</h1>
            <p>Use the form below to contact us.</p>
          </GrayBarSection>
        </div>
      </section>

      <div className="container">
        
        {/* contact form: name, email, message */}
        <form className="space-y-6 max-w-xl mx-auto" action={`${base}/contact`} method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder='Name'
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder='Email'
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder='Message'
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className={classesForCustomButtons}
            >
              Send
            </button>
          </div>
        </form>
        
      </div>

    </Layout>
  );
}
