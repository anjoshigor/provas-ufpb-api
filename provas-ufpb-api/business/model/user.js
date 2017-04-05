class User{
	constructor(login, pass){
		this.login = login;
		this.password = password;
	}

	getLogin(){
		return this.login;
	}

	getPassword(){
		return this.password;
	}

	setLogin(login){
		this.login = login;
	}


	setPassword(password){
		this.password = password;
	}
}