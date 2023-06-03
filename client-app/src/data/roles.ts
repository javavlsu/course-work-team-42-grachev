const toRURoles = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Админ'
    case 'student':
      return 'Студент'
    case 'teacher':
      return 'Преподаватель'
    case 'user':
      return 'Пользователь'
    default:
      return 'Не указано'
  }
}

export default toRURoles
