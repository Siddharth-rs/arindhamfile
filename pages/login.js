import { getProviders, signIn } from 'next-auth/react'
import { Button } from '@mui/material'

function login({ providers }) {
  return (
      <div className=' bg-black flex flex-col items-center min-h-screen justify-center'>
      <img className='w-48 h-48 mb-5' src='https://links.papareact.com/9xl' alt='' />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button className='text-white bg-[#18D860] p-3 rounded-full hover:bg-[#18D860] hover:bg-opacity-90' variant="contained"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Connect to {provider.name}
            </Button>
          </div>
        ))}
      </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
