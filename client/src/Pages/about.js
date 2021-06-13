import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import chart from "../images/chart.png"
function About() {
    const t = useSelector(state => state.theme), { color } = t;
    return (
        <div className={`card ${color}`}>
            <div className={`card-header has-icons-left ${color}`}>
                <NavLink to="/cog" > <i className="fas fa-chevron-left icon is-small pl-2" style={{ "color": "#485fc7" }}></i> </NavLink>
                <p className={`card-header-title ${color} is-centered`}>App Structure</p>
            </div>
            <p className={`help is-danger is-size-6`}>Note : I hope , You aren't here accidentally.</p>
            <div className={`card-content ${color}`}>
                As you know, App name is <b>Souvenir</b> and every typical website has 3 parts namely,
                <ol><li>Front-End </li><li>Back-End</li><li>Database Management System (DBMS)</li></ol> <br />
                Front-End, that You're seeing; Back-End that serves data for you and do data validation; DBMS that stores all data <hr />
                For Front-End, I have used React for making texts and content, for styling, I've used Bulma<br />
                After Being All done, I have deployed/uploaded site to <b>Netlify</b>
                <hr />
                For Back-End, I have used Express( for its simplicity) and lots of libraries. Then I deployed Back-End to <b>Heroku</b>
                <hr />
                For DBMS, I have used MongoDB, where I can control all stored data. Don't worry passwords are encrypted. I can't see them😮
                <img src={chart} alt="chart" width="100%" height="auto" />
                <p className="help is-size-7">An image desribing above thoughts</p>
                <hr />
                Now, You May feel amazed that a typical site has no capability to be installed, then how this one is capable.<br />
                So, Firstly, to have a unique icon and other features after being installed, I made a file named <i>manifest.json</i>
                {' '}and added this file in html file <br /> <code >{"<link rel='manifest' href='/manifest.json'/>"}</code><br /> then,
                I wrote a file named <i>serviceworker.js</i> and added in html using Javascript as follows:
                <br /> <code >navigator.register('./serviceworker.js')</code><br />
                Although, In React-templates there is something related to handle the above scenario <b><i>WorkBox</i></b>.
                <hr />
                Now, This App supports Math and Chemistry Equations, all of this become possible because of Katex (npm library <b>react-katex</b>).
                They provide pixel perfect fonts for equations.<hr/>
                After Being All done, Now you're reading this.😊
            </div>
            <div className={`card-footer py-2 ${color}`}><p className={`card-footer-item is-centered ${color}`}>Thanks For Scrolling Down ©<b>Priyanshu Gupta</b></p></div>
        </div>
    )
}

export default About
