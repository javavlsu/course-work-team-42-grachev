import React from 'react'
import style from './Test.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useTestById } from '../../queries/Courses/coursesQueries'
import serializer from '../../util/form-serialize'
import axios from 'axios'

const Test = () => {
  const { testid } = useParams()
  const { data: test } = useTestById(testid as string)

  const navigate = useNavigate()

  function onsubmit (e: any) {
    e.preventDefault()
    const result = {
      testId: [testid],
      ...serializer(e.target)
    }
    axios
      .post('/api/courses/test', result)
      .then(r => r.data)
    navigate('/')
  }

  return (
    <div className={style.wrapper}>
      <h1 className={style.title__title}>{test?.theme}</h1>
      <form onSubmit={onsubmit}>
        {test?.questions.map((item) =>
          <fieldset key={`question${item.id}${item.question}`}>
            <legend>{item.question}</legend>
            {item.answers.map((answer) =>
              <label key={answer.id}>
                {answer.text}
                <input type="checkbox" name={`${item.id}`} id={`question${item.id}_${answer.id}`} value={answer.id}/>
              </label>
            )}
          </fieldset>
        )}
        <input type="submit" value="Сдать"/>
      </form>
    </div>
  )
}

export default Test
