import React, { useEffect } from 'react'
import { Box , Typography, Button } from '@mui/material'
import { IoLogInSharp } from "react-icons/io5";
import CustomizedInput from '../components/shared/CustomizedInput'
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    //console.log(email , password);
    try {
      toast.loading("Signing-in", {id: "login"});
      await auth?.login(email,password);
      toast.success("signed in successfully", {id: "login"});
    } catch(error){
      console.log(error);
      toast.error("unable to sign-in", {id: "login"});
    }
  };

  useEffect(()=>{
    if(auth?.user){
      navigate("/chat")
    }
  })

  return (
    <Box className="loginBox">

    <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none"}}>
      <img src="jack1.png" alt="ChatBot" style={{width:"400px"}} />
    </Box>

    <Box 
    display={"flex"} 
    flex={{xs: 1, md: 0.5 }} 
    justifyContent={"center"} 
    alignItems={"center"} 
    padding={2} 
    ml={"auto"} 
    mt={16}
    >
      <form
      onSubmit={handleSubmit}
      style={{
        margin: "auto",
        padding: "38px",
        boxShadow: "10px 10px 20px #000",
        borderRadius: "10px",
        border: "none",
      }}
      >
        <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        >
          <Typography variant="h4" textAlign="center" padding={2} fontWeight={600} > 
            Login 
          </Typography>
          <CustomizedInput type="email" name="email" label="Email"/>
          <CustomizedInput type="password" name="password" label="Password"/>
          <Button type="submit" 
            sx={{
              px:2, 
              py:1,
              mt: 2, 
              width: "400px", 
              borderRadius:2, 
              backgroundColor:"#00fffc",
              ":hover": {
                backgroundColor:"white",
                color: "black"
              }
            }}
            endIcon={<IoLogInSharp />}
          > 
            Login 
          </Button>
        </Box>
      </form>
    </Box>

    </Box>
  )
}

export default Login