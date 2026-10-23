import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'

const links = [['Home','/'],['About','/about'],['Ministries','/ministries'],['Sermons','/sermons'],['Events','/events'],['Media','/media'],['Visit Us','/visit']]
export default function Navbar(){const [open,setOpen]=useState(false);return <header className="nav-shell"><div className="container nav"><Link to="/" className="brand" onClick={()=>setOpen(false)}><img src="/images/tmg-logo-banner.jpg" alt="TMG Ministries"/></Link><nav className={`nav-links ${open?'open':''}`}>{links.map(([label,href])=><NavLink key={href} to={href} end={href==='/' } onClick={()=>setOpen(false)}>{label}</NavLink>)}<Link className="nav-cta" to="/give" onClick={()=>setOpen(false)}>Give <ArrowUpRight size={15}/></Link></nav><button className="menu-btn" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
