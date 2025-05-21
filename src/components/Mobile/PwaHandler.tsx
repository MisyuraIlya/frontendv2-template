import { FC } from 'react'
import { useMobile } from '../../provider/MobileProvider'

interface IssueHandlerProps {
  title: string
  link: string
  needPlatform: 'Safari' | 'Chrome'
}

const PwaHandler: FC<IssueHandlerProps> = ({ title, link, needPlatform }) => {
  const iconChrome = 'https://shanishenhav.online/app/img/chrome.png'
  const iconSafari = 'https://shanishenhav.online/app/img/safari.png'
  const googlePlay = 'https://shanishenhav.online/app/img/GooglePlay.png'
  const { isIPhone } = useMobile()

  return (
    <div className="IssueHandler">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {needPlatform === 'Safari' && (
          <img src={iconSafari} alt="Safari icon" />
        )}
        {needPlatform === 'Chrome' && (
          <img src={iconChrome} alt="Chrome icon" />
        )}
      </div>

      <div className="content">
        <h2>{title}</h2>
        <h2>אנו תומכים אך ורק בדפדפן מסוג {needPlatform}</h2>
        <h2>במכשירי {isIPhone ? 'Apple' : 'Android'}</h2>
      </div>

      {needPlatform === 'Chrome' && (
        <>
          <div className="content" style={{ paddingTop: '10px' }}>
            <h4>אנא עקוב אחר הוראות ההתקנה שמופיעות למטה</h4>
          </div>

          <div className="content" style={{ paddingTop: '10px' }}>
            <h4>או לחץ על הקישור להורדת הדפדפן</h4>
            <a href={link}>
              <img src={googlePlay} alt="Google Play Store" />
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default PwaHandler
