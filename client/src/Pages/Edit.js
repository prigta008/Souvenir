import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateuser } from '../Redux/userAction';
import imageCompression from 'browser-image-compression';
import { FileLabel, FormLabel, LastButton, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';
import { NavLink } from 'react-router-dom';
import { Error } from '../components/Error';
function Edit(props) {
    const user = useSelector(state => state.user), { userInfo } = user;
    const theme = useSelector(state => state.theme), { color } = theme, dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [userInfo, props.history]);
    const [username, setname] = useState(userInfo.username), [age, setage] = useState(userInfo.age),
        [desc, setdesc] = useState(userInfo.description ? userInfo.description : ""),
        [file, setFile] = useState(""),
        [dis, setdis] = useState(false),
        [problem, setproblem] = useState(""),
        imghandler = async (e) => {
            let image = e.target.files[0],option = { maxsizeMB: 0.004296875, maxWidthOrHeight: 300 };
             if(image) { let compressed = await imageCompression(image, option),reader = new FileReader();
            reader.readAsDataURL(compressed);reader.addEventListener("load", () => { setFile(reader.result); document.querySelector(".si").style.marginTop = "80px" });
        }},
        submithandler = (e) => {
            e.preventDefault();setdis(true);
            if (username.length < 4 || username.length > 13) {
                setproblem("Username should contain 4 and 13 characters");
            }
            else if (age < 15 || age > 70) {
                setproblem("Your Age should be greater than 15 years!")
            }
            else if(file===""){
                setFile(userInfo.img);dispatch(updateuser(userInfo._id, username, desc, age, file));
            }
            else {
                dispatch(updateuser(userInfo._id, username, desc, age, file));
            }
            setdis(false);
        }
    return (
        <div id="form" className={`${color}`} >
            <form method="POST" className={`card box si ${color}`} autoComplete="off"
                onSubmit={submithandler} onReset={() => { setname(""); setage(0); setdesc(""); setFile(""); }}>
                <header className={`card-header ${color}`}>
                    <NavLink activeClassName="card-header-icon" to="/user">
                        <span className="icon p-0">
                            <i className="fas fa-chevron-left" style={{ "color": "#485fc7" }} ></i>
                        </span>
                    </NavLink>
                    <p className={`card-header-title is-centered ${color}`}>
                        Update User
                </p>
                </header>
                <Error>{problem}</Error>
                <FormLabel labelfor="name" label="Username" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="name" type="text" required={true} value={username}
                        onChange={(e) => { setname(e.target.value); setproblem('') }} />
                    <SmallLabelForLeft icon="fas fa-user" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="age" label="Age" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="age" type="tel" required={true} value={age}
                        onChange={(e) => { setage(e.target.value); setproblem('') }} />
                    <SmallLabelForLeft icon="fas fa-user" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel lablfor="about" label="About" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="about" type="text" required={true} value={desc}
                        onChange={(e) => { setdesc(e.target.value); setproblem('') }} />
                    <SmallLabelForLeft icon="fas fa-pen-alt" />
                    <SmallLabelForRight icon="fa fa-check" />
                </div>
                <FormLabel labelfor="file" label="Profile Pic" />
                <div className="file">
                    <label className="file-label">
                        <input className="file-input" type="file" name="file" required={true}
                            accept="image/*" onChange={imghandler} multiple={false} />
                        <FileLabel />
                    </label>
                </div>
                <br />
                {file ? <img width="40%" height="auto" aria-hidden="true" className="image" src={file} alt="profile" />
                    : ""}
                <br />
                <LastButton dis={dis} />
            </form>
        </div>
    )
}
export default Edit;