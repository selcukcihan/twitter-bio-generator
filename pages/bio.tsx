import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'
import Head from '../components/head'
import React from 'react'
import Footer from '../components/footer'
import { TwitterShareButton } from 'react-twitter-embed'

type Props = {
  bio?: string
}

const getOuterComponent = (isLoaded: boolean, inner: ReactElement) => (
  <>
  <Head />
  <main className='bg-stone-100'>
    <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
      <div className='flex-grow text-center w-full p-4'>
        {!isLoaded && 
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-slate-300 text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-slate-300">Generating your bio, this can take a couple of seconds...</p>
          </div>}
        {isLoaded && inner}
      </div>
      <Footer textSize='text-xs'/>
    </div>
  </main>
</>
)

export default function Home(props: Props) {
  return getOuterComponent(
    true,
    <React.Fragment>
      <div className='justify-center items-center text-2xl '>
        <h1 className='italic text-lg text-stone-500 pt-10'>Your Generated Bio 👇</h1>
        <br/>
        <h2 className='p-1 shadow-lg rounded-xl border-neutral-200 border-2'>{props.bio}</h2>
        <br/>
        <div className='grid place-items-center p-1'>
          <TwitterShareButton
            url='https://twitter-bio-generator.selcukcihan.com'
            options={{text: props.bio + "\n#BIOGENERATOR", size: 'large'}} />
        </div>
      </div>
    </React.Fragment>
  )
}

async function callApiGateway(req: any, res: any) {
  const { accessToken } = await getAccessToken(req, res)
  // Use the access token to call API Gateway.
  const response = await fetch(new URL(' https://5thiyru4j2.execute-api.eu-west-1.amazonaws.com/bio'), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return await response.json()
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx): Promise<{ props: Props }> {
    const session = await getSession(ctx.req, ctx.res)
    const response = await fetch(`https://cihan-twitter-bio-generator-backend-bucket.s3.eu-west-1.amazonaws.com/user/${(session?.user['sub'] as string).split('|')[1]}/bio.json`)
    let bio
    if (response.status !== 200) {
      bio = await callApiGateway(ctx.req, ctx.res)
    } else {
      const lastModified = new Date(response.headers.get('Last-Modified') as string).getTime()
      if (+new Date() - lastModified > 24 * 3600 * 1000) {
        bio = await callApiGateway(ctx.req, ctx.res)
      } else {
        bio = await response.json()
      }
    }

    return {
      props: {
        bio: bio.generated as string,
      }
    }
  }
})
