import { useState, useEffect } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ show, setToken, setPage }) => {
    
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [ login, result ] = useMutation(LOGIN)

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('library-user-token', token)
        }
      }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        login({ variables: {username, password}})
        setPage('authors')
    }
    if(!show) {
        return null
    }

    return (
        <div>
             <h2>Login</h2>
            <form onSubmit={submit}>
                <label>username
                    <input 
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label>password
                    <input 
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button type="submit">login</button>
            </form>
        </div>
    )

}

export default LoginForm