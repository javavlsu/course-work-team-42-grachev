import { Box } from '@mui/material'
import React, { type FC } from 'react'
import { type QuestionProps } from './Question.types'

const Question: FC<QuestionProps> = ({ question }) => {
  return (
    <Box sx={{
      padding: '0 20px',
      minHeight: 100,
      border: 'solid #1976d2 1px',
      borderRadius: '6px',
      fontSize: 90,
      textAlign: 'center'
    }}>
      {question.question}
    </Box>
  )
}

export default Question
