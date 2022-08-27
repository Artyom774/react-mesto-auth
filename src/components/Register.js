import React from 'react';

function Register() {
  return (
    <section className='sign'>
      <h1 className='sign__title'>Регистрация</h1>
      <form className='sign__form'>
        <input type='email' id='email-input' name='email' required className='sign__input' placeholder='Email'></input>
        <input type='password' id='password-input' name='password' required className='sign__input' placeholder='Пароль'></input>
        <button type='submit' className='sign__button'>Зарегистрироваться</button>
      </form>
      <a href='../sign-in' type='button' className='sign__button-sign-in'>Уже зарегистрированы? Войти</a>
    </section>
  );
}

export default Register; 