import { useEffect, useState } from 'react'
import { DataGrid, type GridCellParams, type GridColDef, type MuiBaseEvent, type MuiEvent } from '@mui/x-data-grid'
import axios from 'axios'
import { type Account } from './AccountGrid.types'
import { CircularProgress } from '@mui/material'

const AccountGrid = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'login', headerName: 'Логин' },
    { field: 'email', headerName: 'Почта' },
    { field: 'role', headerName: 'Роль', editable: true },
    { field: 'registerDate', headerName: 'Дата регистрации' },
    { field: 'name', headerName: 'Имя' },
    { field: 'surname', headerName: 'Фамилия' },
    { field: 'patronymic', headerName: 'Отчество' },
    { field: 'score', headerName: 'Счет' }
  ]

  const [users, setUsers] = useState()

  useEffect(() => {
    axios.get('/api/admin/getallusers')
      .then(({ data }) => { setUsers(data) })
  }, [])

  const onCellChange = (params: GridCellParams<Account>, muiEvent: MuiEvent<MuiBaseEvent>) => {
    const account = params.row
    // @ts-expect-error
    account.role = muiEvent.target.value
    if (window.confirm(`Вы уверены, что хотите поменять роль ${account.login} на ${account.role}?`)) {
      axios.post('/api/admin/setuserrole',
        {
          login: account.login,
          role: account.role
        })
    }
  }

  return (
    <div style={{ width: 950, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
      {users
        ? <DataGrid columns={columns} rows={users} onCellEditStop={onCellChange}/>
        : <CircularProgress sx={{ margin: '0 auto' }} size={50}/>
      }
    </div>
  )
}

export default AccountGrid
