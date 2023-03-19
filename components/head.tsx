import Head from 'next/head'
import React from 'react'

const DESCRIPTION = 'Generate alternative bio for Twitter!'
const TITLE = 'Twitter Bio Generator'

export default function H(props?: { title?: string, description?: string }) {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={props?.description || DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content="https://twitter-bio-generator.selcukcihan.com" />
      <meta property="og:title" content={props?.title || TITLE} />
      <meta property="og:description" content={props?.description || DESCRIPTION} />
      <meta property="og:image" content="https://twitter-bio-generator.selcukcihan.com/twitter-bio-generator-ss.png" />
      <meta property="twitter:image" content="https://twitter-bio-generator.selcukcihan.com/twitter-bio-generator-ss.png" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={props?.title || TITLE} />
      <meta property="twitter:description" content={props?.description || DESCRIPTION} />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}
