
const logout = ({navigate}) => {

  window.localStorage.removeItem("token")
  window.localStorage.removeItem("username")
  window.localStorage.removeItem("avatar")
  navigate('/login')
}

module.exports = logout;