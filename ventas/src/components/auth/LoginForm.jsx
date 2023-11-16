//Formulario de inicio de sesion


function LoginForm() {
    return (
        <>
            <form>
                <div className="form-floating mb-3">
                    <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                    <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="inputPassword" type="password" placeholder="Password" />
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="btn btn-primary">Login</a>
                </div>
            </form>


        </>
    );
};

export default LoginForm;