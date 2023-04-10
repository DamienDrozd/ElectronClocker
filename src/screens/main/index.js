import React, {useState, useEffect} from "react";
import { StaticInfo } from "../../components/staticInfo";
import { StressTest } from "../../components/stressTest";
import { DynamicInfo } from "../../components/dynamicInfo";
import {MainDiv, AlignDiv, CardDiv, Login, InstallPackages, CenterDiv} from './styles';
import { TopBar } from "../../components/AppleTopBar";


export const Main = () => {
  const [installPackages, setInstallPackages] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordTest, setPasswordTest] = useState(false)

  const checkPackages = async () => {
    console.log("checkPackages")
    await window.packages.requestInstall()
    await window.packages.checkPackages(setInstallPackages)
  }

  const checkPassword = async () => {
    await window.password.requestcheckpassword()
    await window.password.checkPassword(setPasswordTest)
  }



  useEffect(() => {
    if (passwordTest === false) {
      checkPassword()
    }
  }, [])

  useEffect(() => {
    if (passwordTest === true && installPackages === false) {
      checkPackages()
    }
  }, [passwordTest])

  const LoginFunc = async () => {
      await window.password.setPassword(password)
      await checkPassword()
  }

  if (passwordTest !== true) {
    return (
      <MainDiv>
        <CenterDiv>
        <h1>ElectronClocker</h1>
        <p>By Drozd Damien</p>
          <CardDiv>
            <TopBar />
            <Login>
              <p>Login with your root password</p>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={LoginFunc}>Login</button>
            </Login>
          </CardDiv>  
        </CenterDiv>  
      </MainDiv>
    );
  } else if (installPackages === false) {
    return (
      <MainDiv>
        <CenterDiv>
          <CardDiv>
              <InstallPackages>
                <p>Install packages</p>
              </InstallPackages>
            </CardDiv>
          </CenterDiv>
      </MainDiv>
    )
  } else {
    return (
      <MainDiv>
        <AlignDiv>
          <DynamicInfo />
        </AlignDiv>
        <AlignDiv>
          <StressTest />
          <StaticInfo />
        </AlignDiv>
      </MainDiv>
    );
  }
}

