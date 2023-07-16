import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Link from 'next/link';
import GrayBarSection from '@/components/layout/GrayBarSection';

export default function FAQPage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <section>
        <div className="container">
          <GrayBarSection className='p-8 md:p-20 text-center'>
            <h1>Frequently Asked Questions</h1>
          </GrayBarSection>
        </div>
      </section>

      <div className="container content max-w-xl">

          <h2>How does the rental process work?</h2>

          <p>You can browse our selection online, choose the equipment you need, select your rental dates, and place your order. Once your payment is processed, your order will be ready for pick up or delivery on the chosen date.</p>

          <h2>What is your cancellation policy?</h2>

          <p>View our cancellation policy <Link href="/cancellation-policy">here</Link>.</p>

          <h2>Do I need to provide a deposit?</h2>

          <p>Depending on the equipment and rental period, a deposit may be required. The specific deposit amount will be outlined during the checkout process.</p>

          <h2>What happens if the equipment gets damaged or lost?</h2>

          <p>We understand that accidents happen. However, the renter is responsible for the repair or replacement cost of any damaged or lost equipment.</p>

          <h2>Can I extend my rental period?</h2>

          <p>Extensions are subject to equipment availability and must be requested at least 24 hours before the end of your current rental period. Additional rental fees apply.</p>

          <h2>Can you provide equipment tutorials or guidance?</h2>

          <p>For guidance regarding equipment operation and setup, we recommend referring to the equipment's manual or the manufacturer's website.</p>

      </div>

    </Layout>
  );
}
