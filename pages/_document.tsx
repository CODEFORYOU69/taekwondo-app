// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Page from '../app/page';


class MyDocument extends Document {
  static async getInitialProps(ctx:any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Mettez ici vos liens vers des feuilles de style externes ou tout autre élément <head> global */}
                </Head>
                <body>
                    <Page>
                    <Main />
                    <NextScript />
                    </Page>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
