import Link from 'next/link';
import Logo from "~/images/logo.svg"

const FooterListHeader = ({ name }: { name: string }) => (
  <li className='font-bold text-gray-900'>{name}</li>
)

const FooterListItem = ({ name, link }: { name: string, link: string }) => (
  <li className='transition-colors hover:text-gray-900'>
    <Link className='inline-block py-1' href={link}>
      {name}
    </Link>
  </li>
)


export default function Footer() {
  return (
    <>
      <footer className='container pt-4 pb-0 md:pt-12'>
        <div className='container flex flex-col gap-12 rounded-2xl bg-gray-100 p-8 text-gray-500 md:p-12'>
          <div className='flex flex-col items-start gap-24 lg:flex-row'>

            {/* column 1 */}
            {/* logo */}
            <Link href="/" className="mr-8">
              <Logo className="w-20 h-20" />
            </Link>
              

            {/* column 2 */}
            <ul className='flex flex-col items-start gap-px'>
              <FooterListHeader name="Navigation" />
              <FooterListItem name="Home" link="/" />
              <FooterListItem name="Cameras" link="/cameras" />
              <FooterListItem name="Lenses" link="/lenses" />
              <FooterListItem name="Other Equipment" link="/more" />
            </ul>

            {/* column 3 */}
            <ul className='flex flex-col items-start gap-px'>
              <FooterListHeader name="Pickup Locations" />
              <FooterListItem name="Woodbridge, VA" link="/locations" />
              <FooterListItem name="Tysons, VA" link="/locations" />
            </ul>

            {/* column 4 */}
            <ul className='flex flex-col items-start gap-px'>
              <FooterListHeader name="More Info" />
              <FooterListItem name="How It Works" link="/how-it-works" />
              <FooterListItem name="Cancellation Policy" link="/cancellation-policy" />
              <FooterListItem name="Contact Us" link="/contact" />
              <FooterListItem name="Privacy Policy" link="/privacy-policy" />
            </ul>

          </div>

          <div className='h-px w-full bg-black'></div>

          <div className='flex flex-col justify-between gap-8 md:flex-row text-xs text-gray-400'>
            <div className='flex flex-col gap-8 md:flex-row'>
              <span>Made with ❤️ in Washington, DC</span>              
            </div>

          </div>
        </div>

        <div className='py-8 text-center text-xs text-gray-400'>
          © Copyright 2023 DC Camera Rental. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}