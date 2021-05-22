import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../Redux/userAction';
import { Error } from "../components/Error";
import imageCompression from 'browser-image-compression';
import { FileLabel, FormLabel, LastButton, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';
import Swal from 'sweetalert2';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setname] = useState("");
    const [age, setage] = useState(0);
    const [dis, setdis] = useState(false);
    const [img, setimg] = useState("");
    const [problem, setproblem] = useState("");

    const newuser = useSelector(state => state.newuser);
    const { userInfo, error } = newuser;

    const theme = useSelector(state => state.theme), { color } = theme;
    const dispatch = useDispatch();

    const imghandler = async (e) => {
        let image = e.target.files[0];
        let option = {
            maxsizeMB: 0.004296875,
            maxWidthOrHeight: 300,
            maxIteration: 40
        }
        let compressed = await imageCompression(image, option);
        let reader = new FileReader();
        reader.readAsDataURL(compressed);
        reader.addEventListener("load", () => {
            setimg(reader.result);
            console.log(compressed.size/1024)
        });
    }
    const submithandler = (e) => {
        e.preventDefault();
        setdis(true);
        const t = () => {
            for (let o = 0; o < username.length; o++) {
                if (!isNaN(Number(username.charAt(o)))) { return true }
            }
        }
        if (password.length < 6 || password.length > 10) {
            setproblem("Password should between 6 and 10 characters")
        }
        else if (username.length < 4 || username.length > 13) {
            setproblem("Username should contain between 4 and 13 characters")
        }
        else if (t()) {
            setproblem("Username should not contain number")
        }
        else if (age < 15 || age > 70) {
            setproblem("Your Age should be greater than 15 years!")
        } else {
            const time = new Date();
            dispatch(signup(email, password, username, age, time, img));
        }
        setdis(false);
    }
    useEffect(() => {
        if (userInfo) { setTimeout(function () {if(userInfo.img){
            Swal.fire({icon:"info",html:"Account Created Successfully ! <br/> Proceed to Signin"}); props.history.push("/signin")} }, 4000); }
    }, [userInfo, props.history]);
    return (
        <section id="signin">
            <form method="POST" onSubmit={submithandler}
                onReset={() => { setEmail(""); setPassword(""); setage(0); setname(""); }}
                autoComplete="off" className={`card box ${color}`}>
                <header className="card-header">
                    <NavLink activeClassName={`card-header-icon ${color}`} to="/" >
                        <span className="icon">
                            <i className="fas fa-chevron-left"></i>
                        </span>
                    </NavLink>
                    <p className={`card-header-title is-centered ${color}`}>
                        Register
                </p>
                </header>
                <Error type="red">{problem}</Error>
                <FormLabel labelfor="name" label="Username" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="name" type="text" required={true} value={username}
                        onChange={(e) => { setname(e.target.value); setproblem("") }} />
                    <SmallLabelForLeft icon="fas fa-user" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="email" label="Email-Address" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="email" type="email" required={true} value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <SmallLabelForLeft icon="fas fa-envelope" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="password" label="Password" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="password" type="password" required={true} value={password}
                        onChange={(e) => { setPassword(e.target.value); setproblem("") }} />
                    <SmallLabelForLeft icon="fas fa-lock" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="age" label="Age" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="age" type="tel" required={true} value={age}
                        onChange={(e) => { setage(e.target.value); setproblem("") }} />
                    <SmallLabelForLeft icon="fas fa-user" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="pic" label="Profile Image" />
                <div className="file">
                    <label className="file-label">
                        <input className="file-input" type="file" name="pic" required={true}
                            accept="image/*" onChange={imghandler} multiple={false} />
                        <FileLabel />
                    </label>
                </div>
                <br />
                {
                    img ? <img src={img} alt="src" className="image is-128x128" /> : ""
                }
                <br />
                <LastButton dis={dis} />
                <div className="card-footer is-centered">
                    <p className="card-footer-item is-centered is-small">
                        <Error type="red">{error}</Error>                  
                        Already Have an Account ?  <NavLink to="/signin">Log-In</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}
export default Signup;