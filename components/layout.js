import Head from 'next/head'

export default ({ children }) => (
  <div className='container'>
    <Head>
      <meta name='viewport' content='initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8 user-scalable=no, width=device-width' />
    </Head>
    {children}
    <style jsx global>
      {`
        body {
          background: white;
          color: black;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: auto 1fr auto;
          }
        }
      `}
    </style>
  </div>
)
