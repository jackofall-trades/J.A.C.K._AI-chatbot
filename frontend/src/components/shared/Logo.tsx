import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const Logo = () => {
  return (
    <div style={{
        display: "flex", marginRight: "auto", alignItems: "center", gap: "15px",
    }}>
        <Link to={"/"}>
            <img src='logo.png' alt='J.A.C.K.' width={'30px'} height={'30px'}  />
        </Link>
        <Typography sx={{
                display: { md: "block", sm: "none", xs: "none" },
                mr: "auto",
                fontWeight: "800",
                textShadow:"2px 2px 20px #000",
                }}>
            <span style={{fontSize: "20px" }}>J.A.C.K.</span>
        </Typography> 
    </div>
  )
}

export default Logo