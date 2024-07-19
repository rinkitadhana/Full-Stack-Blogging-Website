import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { useRef } from "react";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();
  const handleSubmit = (e) =>{
    e.preventDefault();
    
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for passwordxxxzz


    let form = new FormData(authForm.current);
    let formData = {};

    for(let [key, value] of form.entries()){
      formData[key] = value;
    }
    let{ fullname, email, password} = formData;
    if(fullname.length<3){
      return console.log({"error": "Full Name must be at least 3 letters long"})
     }
     if(!email.length){
      return console.log({"error": "Enter Email"})
     }
     if(!emailRegex.test(email)){
      return console.log({"error": "Invalid Email"})
     }
     if(!passwordRegex.test(password)){
      return console.log({"error": "Password should be 6 to 20 character long with a numeric, 1lowercase and 1 uppercase letters"})
     }
  }
  return (
    // <AnimationWrapper >
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]" ref={authForm}>
        <h1 className="text-4xl font-gelasio capitalize text-center mb-12">
          {type == "sign-in" ? "Welcome back" : "Join us today"}
        </h1>
        {type != "sign-in" ? (
          <InputBox
            name="name"
            type="text"
            placeholder="Full Name"
            icon="fi-rr-user"
          />
        ) : (
          ""
        )}
        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-envelope"
        />
        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-key"
        />
        <button 
        className="btn-dark center mt-10"
        type="submit"  
        onClick={handleSubmit}
        >
          {type.replace("-", " ")}
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className=" w-1/2 border-black" />
          <p>or</p>
          <hr className=" w-1/2 border-black" />
        </div>
        <button className="btn-dark flex items-center justify-center gap-4 w-auto center">
          <img src={googleIcon} className="w-5" />
          Continue with google
        </button>
        {type == "sign-in" ? (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black text-xl ml-1">
              Sign up here
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Already have an account?
            <Link to="/signin" className="underline text-black text-xl ml-1">
              Sign in here
            </Link>
          </p>
        )}
      </form>
    </section>
    // </AnimationWrapper>
  );
};

export default UserAuthForm;
