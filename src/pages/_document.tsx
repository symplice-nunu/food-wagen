import Document, { Html, Head, Main, NextScript } from "next/document";

import { geistMono, geistSans } from "@/styles/fonts";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-slate-900 antialiased`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
