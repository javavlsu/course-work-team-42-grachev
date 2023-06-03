import React from 'react'
import style from './Main.module.scss'
import clsx from 'clsx'
import { MONTHS } from '../../data/month'
import { Link } from 'react-router-dom'
import PATHS from '../../data/paths'
import { useServicesInfo } from '../../queries/ServicesInfo/servicesInfoQueries'

const Main = () => {
  const { data: servicesInfo } = useServicesInfo()

  return (
    <div>
      <img
        src="/img/Main/mainHeader.png"
        alt="картинка"
        width={'100%'}
        id={style.headerImage}
      />
      <div className={style.info}>
        <p>Актуальные знания от признанных практикующих специалистов</p>
        {(servicesInfo != null) && <div className={style.numbers}>
            <span>{servicesInfo.programsCount}</span>
            <span>{servicesInfo.teachersCount}</span>
            <span>{servicesInfo.graduatesCount}</span>
        </div>}

      </div>
      <div className={style.links}>
        <Link to={PATHS.OPEN_DOORS}>
          <div className={clsx(style.openDoors, 'orangeCard')}>
            <div className={style.openDoors__date}>
              <p className={style.openDoors__day}>{servicesInfo?.openDoorsDate.getDate()}</p>
              <p className={style.openDoors__month}>
                {(servicesInfo != null) && MONTHS[servicesInfo.openDoorsDate.getMonth()]}
              </p>
            </div>
            <div className={style.openDoors__text}>
              <h3>День открытых дверей</h3>
              <p>
                Приглашаем всех желающих на бесплатную экскурсию в мир
                востребованных профессий и полезных навыков
              </p>
            </div>
            <div className={style.openDoors__button}>Записаться</div>
          </div>
        </Link>
        <div className={style.linksDown}>
          <Link to={PATHS.PROGRAMS}>
            <div className={clsx(style.programs, 'blueCard')}>
              <img src="/img/Main/programsMonitor.png" alt="монитор"/>
              <h4>Программы обучения</h4>
              <p>
                В списке наших курсов вы сможете найти профессию и занятие по
                душе, изучить новое и получить практические знания, которые
                помогут получить работу мечты.
              </p>
              <div className={style.programs__button}>Подробнее</div>
            </div>
          </Link>
          <div className={style.other}>
            <Link to={PATHS.NEWS}>
              <div className={clsx(style.news, 'greenCard')}>
                <img src="/img/Main/news.png" alt="новости"/>
                <h3>Новости</h3>
              </div>
            </Link>
            <Link to={PATHS.WORLD_IT}>
              <div className={clsx(style.worldIT, 'pinkCard')}>
                <img src="/img/Main/circleWorld.png" alt="мирИТ"/>
                <h3>Мир IT</h3>
              </div>
            </Link>
            <Link to={PATHS.TEST}>
              <div className={clsx(style.test, 'yellowCard')}>
                <img src="/img/Main/testImage.png" alt="тест"/>
                <div className={style.test__text}>
                  <h3>Попробуй!</h3>
                  <p>
                    Пройдите тест и узнайте свои способности в сфере
                    информационных технологий
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
