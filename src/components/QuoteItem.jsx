import { Card, CardContent, Chip, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const QuoteItem = ({quote}) => {
  return (
    <Card variant='outlined' sx={{width:{md:'50%',sm:'70%'},borderRadius:'10px'}}>
        <CardContent>
            <Typography variant='subtitle2' sx={{color:'gray'}}>{quote.tags.toString()}</Typography>
            <Typography variant='h6' component={'q'}>{quote.content}</Typography>
            <br />
            <Chip label={quote.author} icon={<PersonIcon fontSize='small'/>}/>
            
        </CardContent>
    </Card>
  )
}

export default QuoteItem