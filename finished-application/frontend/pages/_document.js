import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// unstyled website flashing - no css applied.
// server renders the first run of the react app
// client side react picks it up from there and updates if needed
// when we mount a component, all of them have their own css/styled components when they need to be mounted
// ssr everything needs to be ready before we send it to the browser

// document - rendered on server side
// used to change initial server side rendered document markup
export default class MyDocument extends Document {
  // ran on the server before render
  static getInitialProps({ renderPage }) {
    // renders out our app and crawls every single component in the tree
    const sheet = new ServerStyleSheet();
    // looks for style that needs to be collected
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    // combines them into one and drops them into the page
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
