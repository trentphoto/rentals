import React from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import GrayBarSection from '@/components/layout/GrayBarSection'

export default function CancellationPolicyPage() {

  return (
    <Layout>
        <Seo />

        <section>
          <div className="container">
            <GrayBarSection className='p-8 md:p-20 text-center'>
              <h1>Cancellation Policy</h1>
            </GrayBarSection>
          </div>
        </section>

        <section className="mb-12">
          <div className="container content max-w-2xl">
            <p className="italic">Last updated: Jul 14, 2023</p>
            
            <h2>1. Introduction</h2>

            <p>At DC Camera Rentals, we understand that plans can change, which may necessitate the cancellation of a rental order. Our cancellation policy is designed to be as accommodating as possible to our customers, while also ensuring that we manage our inventory effectively.</p>

            <h2>2. Cancellations</h2>

            <p>You may cancel your order at any time, subject to the following conditions:</p>

            <ul>
              <li>More than 48 hours prior to the rental start date: Full refund will be issued.</li>
              <li>24 to 48 hours prior to the rental start date: 50% refund will be issued.</li>
              <li>Less than 24 hours prior to the rental start date or failure to pick up the rental: No refund will be issued as we would have set aside the equipment specifically for your order, preventing others from renting it.</li>
            </ul>


            <h2>3. Modifications</h2>

            <p>If you wish to modify your order (such as changing the rental equipment), please contact us as soon as possible. We will accommodate your request to the best of our ability, but we cannot guarantee the availability of different equipment.</p>

            <h2>4. Early Returns</h2>

            <p>If you choose to return your rental item(s) early, we do not provide any refund for the unused rental days.</p>

            <h2>5. No-Shows</h2>

            <p>If you do not pick up your rental equipment on the agreed date, and you do not notify us about this delay, we will consider it as a no-show. No refund will be provided for no-shows.</p>

            <h2>6. Unforeseen Circumstances</h2>

            <p>If we unable to provide the rental equipment due to unforeseen circumstances, we will inform you as soon as possible and provide a full refund or offer a suitable replacement.</p>

            <h2>7. Contact</h2>

            <p>If you have any questions or would like to cancel or modify your order, please contact us via the contact form on our website.</p>

          </div>
        </section>

    </Layout>
  )
}
