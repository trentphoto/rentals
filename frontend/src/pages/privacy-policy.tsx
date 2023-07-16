import React from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/Seo'
import GrayBarSection from '@/components/layout/GrayBarSection'

export default function PrivacyPolicyPage() {

  return (
    <Layout>
        <Seo />

        <section>
          <div className="container">
            <GrayBarSection className='p-8 md:p-20 text-center'>
              <h1>Privacy Policy</h1>
            </GrayBarSection>
          </div>
        </section>

        <section className="mb-12">
          <div className="container content max-w-2xl">
            <p className="italic">Last updated: Jul 14, 2023</p>
            <h2>1. Introduction</h2>

            <p>At [Your Business Name], we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes:</p>

            <ul>
              <li>The types of information we may collect from you or that you may provide when you visit our website [website address].</li>
              <li>Our practices for collecting, using, maintaining, protecting, and disclosing that information.</li>
            </ul>

            <h2>2. Information We Collect About You</h2>
            <p>We collect several types of information from and about users of our website, including:</p>
            <ul>
              <li>Personal data, such as your name, postal address, e-mail address, telephone number, and any other identifier by which you may be contacted online or offline.</li>
              <li>Information about your internet connection, the equipment you use to access our website and usage details.</li>
            </ul>

            <h2>3. How We Collect Your Information</h2>

            <p>We use different methods to collect data from and about you including through:</p>

            <ul>
              <li>Direct interactions. You may give us your identity, contact, and financial information by filling in forms or by corresponding with us.</li>
              <li>Automated technologies or interactions. As you interact with our website, we may automatically collect technical data about your equipment, browsing actions, and patterns.</li>
            </ul>

            <h2>4. How We Use Your Information</h2>
            <p>We use the information that we collect about you or that you provide to us, including any personal information:</p>

            <ul>
              <li>To present our website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To fulfill the purposes for which you provided the information or that were described when it was collected, or any other purpose for which you provide it.</li>
              <li>To notify you about changes to our website or any products or services we offer or provide through it.</li>
            </ul>

            <h2>5. Disclosure of Your Information</h2>

            <p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. However, we do not share, sell, or otherwise disclose your personal information for purposes other than those outlined in this Privacy Policy.</p>

            <h2>6. Data Security</h2>

            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.</p>

            <h2>7. Changes to Our Privacy Policy</h2>

            <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.</p>

            <h2>8. Contact Information</h2>

            <p>To ask questions or comment about this privacy policy and our privacy practices, contact us via our contact form on this website.</p>

          </div>
        </section>

    </Layout>
  )
}
