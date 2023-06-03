import React from 'react'
import style from './ContactForm.module.scss'
import clsx from 'clsx'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

type ContactFormTypes = {
  className?: string
}

type FormValueType = {
  name: string
  phoneNumber: string
  email: string
}

const ContactForm: React.FC<ContactFormTypes> = ({ className }) => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormValueType>()

  const onFormSubmit: SubmitHandler<FormValueType> = async (data) => {
    await axios.post('/api/appeal', data)
    reset()
  }

  return (
    <div className={clsx(style.wrapper, className)}>
      <div className={clsx(style.background, style.backgroundShadow)}/>
      <div className={clsx(style.background, style.whiteBackground)}>
        <img src="/img/Layout/sova.png" alt="сова" className={style.sova}/>
        <div className={style.helpWrapper}>
          <div className={style.help}>
            <h4>Помочь с выбором?</h4> <br/>
            <p>
              Оставьте заявку и наши специалисты свяжутся с вами, ответят на все
              вопросы и подберут подходящий вариант обучения.
            </p>
          </div>
        </div>
        <div className={style.formWrapper}>
          <form onSubmit={handleSubmit(onFormSubmit)} className={style.form}>
            <input type="text"
                   placeholder="Ваше имя"
                   className={style.input}
                   {...register('name', { required: true })} />
            <input type="text"
                   placeholder="Ваш телефон"
                   className={clsx(style.input)}
                   pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
                   {...register('phoneNumber', { required: true })} />
            <input type="email"
                   placeholder="Ваш e-mail"
                   className={clsx(style.marginTop20, style.input)}
                   {...register('email', { required: true })} />
            <p className={clsx(style.agree, style.marginTop20)}>
              Нажимая на кнопку, я соглашаюсь на обработку персональных данных и
              с правилами пользования Платформой
            </p>
            <button className={clsx(style.button, style.marginTop20)} type="submit"> Отправить</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
