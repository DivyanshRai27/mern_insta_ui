import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'

const Signin =()=>{
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if (data.error) {
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                M.toast({html: "Signed in success", classes:"#43a047 green darken-1"})
                history.push('/')
            }

        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
       <h2>Instagram</h2>
       <input 
       type="text"
       placeholder="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
        <input 
       type="text"
       placeholder="password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
         <button className="btn waves-effect waves-light #2196f3 blue"
         onClick={()=>PostData()}>Sign in
  </button>
  <h5><Link to="/signup">Don't have an account?</Link></h5>
      </div>
        </div>
    )
}

export default Signin