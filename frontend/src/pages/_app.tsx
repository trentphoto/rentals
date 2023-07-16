import { AppProps } from 'next/app';
import { DatePickerProvider } from '@/lib/DatePickerContext';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DatePickerProvider>
      <Component {...pageProps} />;
    </DatePickerProvider>
  )
}

export default MyApp;
