import "@/styles/globals.css";
import { IDEProvider } from '../contexts/IDEContext';

function MyApp({ Component, pageProps }) {
  return (
    <IDEProvider>
      <Component {...pageProps} />
    </IDEProvider>
  );
}

export default MyApp;
