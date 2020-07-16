import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

const Signup =()=>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if (data.error) {
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else {
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/signin')
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
       placeholder="name"
       value={name}
       onChange={(e)=>setName(e.target.value)}
       />
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
         onClick={()=>PostData()}>Sign Up
  </button>
  <h5><Link to="/signin">Already have an account?</Link></h5>
      </div>
        </div>
    )
}

export default Signup