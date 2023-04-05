import Document, { DocumentContext, Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document'

class MyDocument extends Document {

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        <div id="modal-root"/>
        </body>
      </Html>
    )
  }
}

export default MyDocument