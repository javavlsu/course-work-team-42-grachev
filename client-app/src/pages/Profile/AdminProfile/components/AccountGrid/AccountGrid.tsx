import { type ChangeEvent, useEffect, useState } from 'react'
import { DataGrid, type GridCellParams, type GridColDef, type MuiBaseEvent, type MuiEvent } from '@mui/x-data-grid'
import axios from 'axios'
import { type Account } from './AccountGrid.types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

const AccountGrid = () => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'login',
      headerName: 'Логин'
    },
    {
      field: 'email',
      headerName: 'Почта'
    },
    {
      field: 'role',
      headerName: 'Роль',
      editable: true
    },
    {
      field: 'registerDate',
      headerName: 'Дата регистрации'
    },
    {
      field: 'name',
      headerName: 'Имя'
    },
    {
      field: 'surname',
      headerName: 'Фамилия'
    },
    {
      field: 'patronymic',
      headerName: 'Отчество'
    },
    {
      field: 'score',
      headerName: 'Счет'
    }
  ]

  const [users, setUsers] = useState()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [group, setGroup] = useState('')
  const [department, setDepartment] = useState('')
  const [accountState, setAccountState] = useState({} as Account)

  useEffect(() => {
    axios.get('/api/admin/getallusers')
      .then(({ data }) => {
        setUsers(data)
      })
  }, [])

  const onCellChange = (params: GridCellParams<Account>, muiEvent: MuiEvent<MuiBaseEvent>) => {
    const account = params.row
    // @ts-expect-error
    account.role = muiEvent.target.value
    if (account.role === 'student') {
      setAccountState(account)
      setIsDialogOpen(true)
    } else if (window.confirm(`Вы уверены, что хотите поменять роль ${account.login} на ${account.role}?`)) {
      axios.post('/api/admin/setuserrole',
        {
          login: account.login,
          role: account.role,
          group: '',
          department: ''
        })
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const onStudentSubmit = () => {
    if (window.confirm(`Вы уверены, что хотите поменять роль ${accountState.login} на ${accountState.role}?`)) {
      axios.post('/api/admin/setuserrole',
        {
          login: accountState.login,
          role: accountState.role,
          group,
          department
        })
    }
    setIsDialogOpen(false)
    setGroup('')
    setDepartment('')
  }

  return (
    <>
      <div style={{
        width: 950,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {users
          ? <DataGrid columns={columns} rows={users} onCellEditStop={onCellChange}/>
          : <CircularProgress sx={{ margin: '0 auto' }} size={50}/>
        }
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Укажите данные для студента</DialogTitle>
        <DialogContent dividers>
          <TextField id="avatarUrl" label="Группа" fullWidth margin="normal" value={group}
                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setGroup(event.target.value)
                     }}/>
          <TextField id="nickname" label="Кафедра" fullWidth margin="normal"
                     value={department}
                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setDepartment(event.target.value)
                     }}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>ЗАКРЫТЬ</Button>
          <Button onClick={onStudentSubmit} variant="contained">СОХРАНИТЬ</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AccountGrid
