import React from 'react';

function Login() {
  return (
    <section className='sign'>
      <h1 className='sign__title'>Вход</h1>
      <form className='sign__form'>
        <input type='email' id='email-input' name='email' required className='sign__input' placeholder='Email'></input>
        <input type='password' id='password-input' name='password' required className='sign__input' placeholder='Пароль'></input>
        <button type='submit' className='sign__button'>Войти</button>
      </form>
    </section>
  );
}

export default Login; 