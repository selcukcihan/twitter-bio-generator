import React from 'react'

export default function Footer(props: { textSize: 'text-xs' | 'text-lg'}) {
  const className = `break-words p-10 text-left font-mono opacity-60 ${props.textSize}`
  return (
    <section id='about' className={className}>
      <ul className='list-disc pl-10'>
        <li>The original bio is fetched from Twitter through AWS Lambda + API Gateway. It's processed with OpenAI to generate an alternative bio.</li>
        <li>Frontend code can be found at <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/twitter-bio-generator' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/twitter-bio-generator</a>.</li>
        <li>More details on how the backend works is explained in <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/twitter-bio-generator-backend' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/twitter-bio-generator-backend</a>.</li>
        <li>Check <a className='opacity-80 hover:opacity-100' href='https://selcukcihan.com' rel="noreferrer" target='_blank'>selcukcihan.com</a> to reach out!</li>
      </ul>
    </section>
  )
}
