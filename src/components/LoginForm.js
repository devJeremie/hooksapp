import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim() === '' || password.trim() === '') {
      setWarning(true)
      return
    }
    setWarning(false)
    onLogin && onLogin({ email, password })
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <form className="card card-body" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Connexion</h3>

        {warning && (
          <div className="alert alert-danger">Veuillez remplir tous les champs.</div>
        )}

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Mot de passe</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" className="btn btn-primary mt-2" value="Se connecter" />
      </form>
    </div>
  )
}

export default LoginForm
