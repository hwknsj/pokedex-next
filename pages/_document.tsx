import Document, { Html, Head, Main, NextScript } from 'next/document'
import { extractCritical } from '@emotion/server'
import Script from 'next/script'

/* NOTE: this looks really weird, but it helps to prevent "FOUC" */
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const page = await ctx.renderPage()
    const styles = extractCritical(page.html)
    return { ...initialProps, ...page, ...styles }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <Script
          src={'@marcom/ac-accordion/src/js/ac-accordion'}
          strategy='afterInteractive'
          id='ac-accordion-js'
          onLoad={() => document.getElementById('accoordion')}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
