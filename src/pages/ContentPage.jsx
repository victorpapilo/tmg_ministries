import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, Play, Search, Heart, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export function ListingPage({type}){
  const config = {
    sermons: {
      eyebrow: 'THE WORD',
      title: 'Sermons that stay with you.',
      text: 'Explore TMG messages, teaching and moments from the Word.',
      icon: BookOpen,
      cta: 'Watch a sermon'
    },
    events: {
      eyebrow: 'WHAT’S HAPPENING',
      title: 'Gather. Grow. Get involved.',
      text: 'Discover upcoming TMG gatherings and church moments.',
      icon: CalendarDays,
      cta: 'View event'
    },
    ministries: {
      eyebrow: 'FIND YOUR PLACE',
      title: 'There is room for you here.',
      text: 'Explore the ministries and communities that make up TMG.',
      icon: Heart,
      cta: 'Explore ministry'
    }
  }[type]

  const Icon = config.icon

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch(`/api/${type}`)
      .then(async response => {
        if (!response.ok) {
          throw new Error('Could not load content.')
        }

        return response.json()
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : [])
      })
      .catch(error => {
        console.error(`Failed to load ${type}:`, error)
        setItems([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [type])

  return (
    <>
      <Navbar />

      <main>
        <section className="page-hero page-hero-motion">
          <div className="container">
            <span className="eyebrow">{config.eyebrow}</span>
            <h1>{config.title}</h1>
            <p>{config.text}</p>
          </div>
        </section>

        <section className="section container">
          <div className="listing-toolbar">
            <div>
              <span className="eyebrow">TMG {type.toUpperCase()}</span>
              <h2>Coming together.</h2>
            </div>

            <div className="search-shell">
              <Search size={16} />
              <input
                placeholder={`Search ${type}...`}
                disabled
              />
            </div>
          </div>

          {loading ? (
            <div className="empty-feature">
              <div className="empty-icon">
                <Icon />
              </div>

              <span className="eyebrow">LOADING</span>

              <h3>
                Loading {type}...
              </h3>

              <p>
                Please wait while we load the latest TMG content.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-feature">
              <div className="empty-icon">
                <Icon />
              </div>

              <span className="eyebrow">CONTENT READY</span>

              <h3>
                {type === 'sermons'
                  ? 'Sermon library ready for your first message.'
                  : type === 'events'
                  ? 'Your events will appear here as the church adds them.'
                  : 'Your ministries will appear here as the church adds them.'}
              </h3>

              <p>
                The management system is designed so TMG staff can create
                and update this content without changing the website code.
              </p>

              <Link className="text-link" to="/contact">
                Ask about getting involved
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="content-grid">
              {items.map(item => (
                <article className="content-card" key={item._id}>
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title || 'TMG Ministries'}
                    />
                  )}

                  <div className="content-card-body">
                    <span className="eyebrow">
                      {item.category || type}
                    </span>

                    <h3>
                      {item.title || item.name}
                    </h3>

                    {item.speaker && (
                      <p className="muted">
                        {item.speaker}
                      </p>
                    )}

                    {item.scripture && (
                      <p>
                        {item.scripture}
                      </p>
                    )}

                    {item.date && (
                      <p className="muted">
                        {item.date}
                      </p>
                    )}

                    {item.description && (
                      <p>
                        {item.description}
                      </p>
                    )}

                    {item.videoUrl && (
                      <a
                        className="text-link"
                        href={item.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch sermon
                        <Play size={16} />
                      </a>
                    )}

                    {item.audioUrl && (
                      <a
                        className="text-link"
                        href={item.audioUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Listen to audio
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export function Give(){
 const [form,setForm]=useState({name:'',email:'',amount:'',type:'offering'});const [loading,setLoading]=useState(false);const [message,setMessage]=useState('');const [verified,setVerified]=useState(false)
 useEffect(()=>{const reference=new URLSearchParams(window.location.search).get('reference');if(reference){setLoading(true);fetch(`/api/payments/verify/${encodeURIComponent(reference)}`).then(r=>r.json()).then(d=>{if(d.status==='success'){setVerified(true);setMessage('Thank you. Your giving transaction was confirmed successfully.')}else setMessage('We could not confirm this transaction yet. Please contact the church if you were charged.');}).catch(()=>setMessage('We could not confirm the transaction right now.')).finally(()=>setLoading(false))}},[])
 const pay=async e=>{e.preventDefault();setLoading(true);setMessage('');try{const r=await fetch('/api/payments/initialize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw new Error(d.message||'Could not start payment.');window.location.href=d.authorizationUrl}catch(err){setMessage(err.message)}finally{setLoading(false)}}
 return <><Navbar/><main><section className="page-hero"><div className="container"><span className="eyebrow">GENEROSITY</span><h1>Give with purpose.</h1><p>Support the work of TMG Ministries through a secure Paystack checkout. Choose whether your gift is a tithe, offering, or another approved category.</p></div></section><section className="section container two-col"><div><SectionHeading eyebrow="TITHE & OFFERING" title="Generosity is part of worship." text="Your payment is handled by Paystack. The church can review successful giving records from the management system."/><div className="giving-note"><span className="eyebrow">SECURE CHECKOUT</span><strong>Paystack • NGN</strong><p>Never enter your Paystack secret key into the website. It stays on the server.</p></div></div><form className="form-card" onSubmit={pay}><h2>{verified?'Payment confirmed':'Make a gift'}</h2>{verified?<p className="success">{message}</p>:<><label>Name (optional)<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Giving type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="tithe">Tithe</option><option value="offering">Offering</option><option value="special">Special giving</option><option value="other">Other</option></select></label><label>Amount (₦)<input type="number" min="100" required value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></label><button className="btn btn-primary" disabled={loading}>{loading?'Opening secure checkout…':'Continue to Paystack'} <ArrowRight size={16}/></button>{message&&<p className="error">{message}</p>}</>}</form></section></main><Footer/></>
}

export function Prayer(){return <><Navbar/><main><section className="page-hero"><div className="container"><span className="eyebrow">PRAYER</span><h1>You don't have to carry it alone.</h1><p>Share a prayer request with TMG. Your request will be received by the church team.</p></div></section><PrayerForm/></main><Footer/></>}
function PrayerForm(){return <section className="section container prayer-layout"><div><SectionHeading eyebrow="PRAYER REQUEST" title="Let us stand with you." text="Please share only what you are comfortable submitting. The church team can manage requests securely from the admin dashboard."/></div><form className="form-card" onSubmit={async e=>{e.preventDefault();const fd=new FormData(e.currentTarget);try{await fetch('/api/prayers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:fd.get('name'),email:fd.get('email'),request:fd.get('request')})});e.currentTarget.reset();alert('Your prayer request has been sent.')}catch{alert('Please try again.')}}}><label>Name (optional)<input name="name"/></label><label>Email (optional)<input name="email" type="email"/></label><label>Prayer request<textarea name="request" rows="7" required/></label><button className="btn btn-primary">Submit Prayer Request <ArrowRight size={16}/></button></form></section>}

export function MediaPage(){const photos=[['/images/worship-service.jpg','Worship'],['/images/preacher.jpg','The Word'],['/images/children-event.jpg','Community'],['/images/leaders.jpg','Leadership']];return <><Navbar/><main><section className="page-hero"><div className="container"><span className="eyebrow">TMG MEDIA</span><h1>Moments worth remembering.</h1><p>A visual glimpse into the life of TMG Ministries.</p></div></section><section className="section container media-masonry">{photos.map(([src,label],i)=><Reveal key={src} delay={i*.08} className={`media-tile tile-${i+1}`}><img src={src} alt={`TMG Ministries ${label}`}/><div><span>{label}</span><ArrowRight size={15}/></div></Reveal>)}</section></main><Footer/></>}
