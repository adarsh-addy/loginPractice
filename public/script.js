const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit",async (e) =>{
	e.preventDefault();
	alert("hi");
  
	//post method
	
  let name = document.querySelector("input[name='name']").value;
  let email = document.querySelector("input[name='email']").value;
  let password = document.querySelector("input[name='password']").value;
  
	let resp = await axios
	  .post("/backend/save",{name,email,password})
	  .catch((err) => {
		console.log(err.response.data);
		// alert(err.response.data)
		let div = document.querySelector(".form");
		div.innerHTML = "";
		div.innerHTML = `<h1>No Data</h1>`;
	  });
	if (resp) {
	  console.log(resp.data);
	  // alert(resp.data.message)
  
	  
	}
});//signup
secondForm.addEventListener("submit", (e) => e.preventDefault());//login


