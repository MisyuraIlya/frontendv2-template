import { useMobile } from '../../provider/MobileProvider'
import PwaHandler from './PwaHandler'

const IosHandler = () => {
  const { isPwa, detectBrowser } = useMobile()
  function isUsingChromeOniPhone() {
    const userAgent = window.navigator.userAgent
    return /CriOS/i.test(userAgent)
  }

  return (
    <>
      {detectBrowser() === 'Safari' && !isUsingChromeOniPhone() ? (
        <>{!isPwa && <></>}</>
      ) : (
        <PwaHandler
          title={'אנחנו תומכים רק בדפדפן SAFARI'}
          link={''}
          needPlatform={'Safari'}
        />
      )}
    </>
  )
}

export default IosHandler
