import LoginForm from '../components/LoginForm'

const Login = () => {
  const handleLogin = ({ email, password }) => {
    console.log('Login:', email, password)
  }

  return <LoginForm onLogin={handleLogin} />
}

export default Login
