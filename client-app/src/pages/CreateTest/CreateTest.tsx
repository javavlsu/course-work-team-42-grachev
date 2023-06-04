import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { TestStore } from '../../mobx'
import { Question } from './components'

const CreateTest = () => {
  const { courseid } = useParams()
  console.log(courseid)

  return (
    <Box
      sx={{
        margin: '0 auto',
        width: 900,
        padding: '20px 0'
      }}>

      {
        TestStore.questions.map((item) => (
          <Question question={item} key={item.answers[0].questionId}/>
        ))
      }

      <Button size="large" variant="outlined"
              sx={{ width: '100%', height: 100, fontSize: 32, marginTop: 3, border: 'dashed 1px' }}>
        Добавить вопрос
      </Button>
    </Box>
  )
}

export default observer(CreateTest)
