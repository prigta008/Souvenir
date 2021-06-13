import React from 'react'
import { useSelector } from "react-redux"
import "katex/dist/katex.min.css"
import { BlockMath } from "react-katex"
import { NavLink } from 'react-router-dom';
function Glossary() {
    const theme = useSelector(state => state.theme), { color } = theme;
    return (
        <div className={`card ${color}`}>
            <div className={`card-header has-icons-left ${color}`}><NavLink to="/add"><i style={{"color":"#485fc7"}} className="pl-2 fas fa-chevron-left"></i></NavLink><div className={`card-header-title ${color} is-centered`}>Writing Equations</div></div>
            <div className={`card-content px-1 ${color}`}>
                Writing Equations in a Post may seem tedious. But, Now It has become quite simple.
            <hr />
                <p style={{ "color": "red" }}>Note: This App now support Block level & Inline Equations also.</p>
                <br />
            To write a Block Level Equations, enclose the equation within <code>₹₹₹</code>.
            And, To write a Inline Level Equations, enclose the equation within <code>₹₹</code>.
             It implies that If you want write x<sup>2</sup>
            {"  "}You've to write <code>₹₹₹ x^2 ₹₹₹</code>. Looks simple? Great! Output: <BlockMath math="x^2"></BlockMath> <hr />
            If you want to write fractions like 22/7 then you should write \frac{"{22}{7}"}. Notice the use of curly braces. <br />Output: <BlockMath math="\frac{22}{7}"></BlockMath>
            Write the group statements in curly braces for better results.
            For Writing Greek Symbols use <b>\</b> then name of symbol like alpha,beta,gamma etc. If you want to write capital symbols, then write Alpha,Beta,Gamma<br />
            Example: <b>\alpha,\beta,\gamma</b>  ;<b> \Alpha,\Beta,\Gamma.</b>
            Output: <BlockMath math="\alpha \beta \gamma"></BlockMath>
                <hr />
            For Writing Integration symbol use <b>\int</b> and For summation use <b>\sum</b>.Output: <BlockMath math="\int \sum"></BlockMath>
                <hr />
            For subscripting (lower {"&"} smaller text) use <b>_</b> and for superscripting(upper and smaller text) use <b>^</b>
            for under texts like seen in <b>limits</b> write <code>\lim_{"{x\\to 0}"}</code>.
             Output: <BlockMath math="\lim_{x \to 0}"></BlockMath>
                <hr />
            Some Examples:<br />
            Write:<br/> ₹₹₹\vec{"{F}"} = \frac{"{Gm_{1}m_{2}}"}{"{r^{3}}"} \hat{"{r}"} ₹₹₹<br/> Get:
             <BlockMath math="\vec{F} = \frac{Gm_{1}m_{2}}{r^3} \hat{r}"></BlockMath>
            Write:<br/> ₹₹₹ \int_{"{a}"}^{"{b}"} f(x) dx = F(b) - F(a)₹₹₹ <br/>Get:
            <BlockMath math="\int_{a}^{b} f(x) dx = F(b)-F(a)"></BlockMath>
            Write:<br/> ₹₹₹ \sum_{"{i=0}"}^{"{n}"} ~ i = \frac{"{n(n+1)}"}^{"{2}"} ₹₹₹<br/> Get: <BlockMath math="\sum_{i=0}^{n} ~ i  = \frac{n(n+1)}{2}"></BlockMath>
            <hr/>
            These are same for inline level just use <code>₹₹</code> only.
            Don't worry If you didn't get it right now. You can review the expressions along with the post while editing it.  
           <br/>Want to Read more about it? <a href="https://katex.org/docs/supported.html" style={{"color":"#485fc7"}}>Read It here</a>
            </div>
        </div>
    )
}

export default Glossary
