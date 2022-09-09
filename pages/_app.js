import "../styles/globals.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StoreProvider } from "../Store/Store";
import { SnackbarProvider } from "notistack";
const ClientSideEmotionCache = createCache({ key: "css" });
function MyApp({
  Component,
  pageProps,
  emotionCache = ClientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider anchorOrigin={{vertical:"top",horizontal:'center'}}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
