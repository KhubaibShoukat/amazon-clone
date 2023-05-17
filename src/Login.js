import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import logo from './images/logo-black.png'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => error.message)

    }

    const register = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {
                // console.log(auth)
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => error.message)
    }


    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo'
                    src={logo}
                />
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    />

                    <button
                        className='login__signInButton'
                        type='submit'
                        onClick={signIn}
                    >
                        Sign In
                    </button>
                </form>
                <p>By continuing, you agree to Amazon's Clone Conditions of Use and Privacy Notice.</p>
                <button
                    className='login__registerButton'
                    onClick={register}
                >
                    Create your Aamzon Account
                </button>


            </div>
        </div>
    )
}

export default Login