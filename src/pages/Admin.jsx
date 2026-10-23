import {useEffect,useMemo,useState} from 'react'
import {Routes,Route,NavLink,useNavigate} from 'react-router-dom'
import {LayoutDashboard,CalendarDays,Mic2,HeartHandshake,MessageSquare,Settings,LogOut,Menu,X,ShieldCheck,Users,Megaphone,Images,UserRoundCog,BarChart3,BookOpen,Mail,UserPlus,ClipboardCheck,HandHeart,UserCheck,Baby,FileText,History,Bell,WalletCards,Newspaper} from 'lucide-react'
import {api,getError} from '../lib/api'

const nav=[
 ['Dashboard','/admin',LayoutDashboard],['Sermons','/admin/sermons',Mic2],['Events','/admin/events',CalendarDays],['Registrations','/admin/registrations',ClipboardCheck],['Ministries','/admin/ministries',Users],['Leadership','/admin/leadership',UserRoundCog],['Announcements','/admin/announcements',Megaphone],['Blog','/admin/blog',Newspaper],['Media','/admin/media',Images],['Prayer Requests','/admin/prayers',HeartHandshake],['Messages','/admin/messages',MessageSquare],['Subscribers','/admin/subscribers',Mail],['Members','/admin/members',UserPlus],['Attendance','/admin/attendance',ClipboardCheck],['Groups','/admin/groups',Users],['Volunteers','/admin/volunteers',UserCheck],['Follow-up','/admin/followups',HandHeart],['Children Check-in','/admin/childcheckins',Baby],['Documents','/admin/documents',FileText],['Donations','/admin/donations',WalletCards],['Analytics','/admin/analytics',BarChart3],['Activity Log','/admin/activity',History],['Notifications','/admin/notifications',Bell],['Admin Users','/admin/admins',ShieldCheck],['Settings','/admin/settings',Settings]
]
const configs={
 sermons:{label:'Sermons',endpoint:'sermons',fields:[['title','Title'],['speaker','Speaker'],['date','Date'],['category','Category'],['scripture','Scripture'],['videoUrl','Video URL'],['audioUrl','Audio URL'],['thumbnail','Thumbnail URL'],['description','Description','textarea']]},
 events:{label:'Events',endpoint:'events',fields:[['title','Title'],['date','Date'],['time','Time'],['location','Location'],['category','Category'],['capacity','Capacity'],['registrationUrl','External registration URL'],['image','Image URL'],['description','Description','textarea']]},
 ministries:{label:'Ministries',endpoint:'ministries',fields:[['name','Name'],['leader','Leader'],['meetingInfo','Meeting information'],['contactInfo','Contact information'],['image','Image URL'],['description','Description','textarea']]},
 leadership:{label:'Leadership',endpoint:'leadership',fields:[['name','Name'],['position','Position'],['photo','Photo URL'],['biography','Biography','textarea']]},
 announcements:{label:'Announcements',endpoint:'announcements',fields:[['title','Title'],['expiresAt','Expires at'],['body','Body','textarea']]},
 blog:{label:'Blog / Articles',endpoint:'blog',fields:[['title','Title'],['slug','Slug'],['excerpt','Excerpt'],['coverImage','Cover image URL'],['author','Author'],['tags','Tags (comma separated)'],['content','Content','textarea']]},
 media:{label:'Media',endpoint:'media',fields:[['title','Title'],['url','Image/file URL'],['category','Category'],['alt','Alt text'],['description','Description','textarea']]},
 documents:{label:'Documents',endpoint:'documents',fields:[['title','Title'],['url','File URL'],['category','Category'],['description','Description','textarea']]},
 members:{label:'Members / Visitors',endpoint:'members',fields:[['firstName','First name'],['lastName','Last name'],['email','Email'],['phone','Phone'],['address','Address'],['status','Status'],['department','Department'],['joinDate','Join date'],['notes','Notes','textarea']]},
 attendance:{label:'Attendance',endpoint:'attendance',fields:[['date','Date'],['service','Service'],['name','Name'],['status','Status'],['memberId','Member ID'],['notes','Notes','textarea']]},
 groups:{label:'Groups / Small Groups',endpoint:'groups',fields:[['name','Name'],['type','Type'],['leader','Leader'],['meetingDay','Meeting day'],['meetingTime','Meeting time'],['location','Location'],['description','Description','textarea']]},
 volunteers:{label:'Volunteers',endpoint:'volunteers',fields:[['name','Name'],['email','Email'],['phone','Phone'],['area','Service area'],['status','Status'],['notes','Notes','textarea']]},
 followups:{label:'Follow-up',endpoint:'followups',fields:[['name','Name'],['email','Email'],['phone','Phone'],['source','Source'],['stage','Stage'],['assignedTo','Assigned to'],['nextActionAt','Next action'],['notes','Notes','textarea']]},
 childcheckins:{label:'Children Check-in',endpoint:'childcheckins',fields:[['childName','Child name'],['guardianName','Guardian name'],['guardianPhone','Guardian phone'],['service','Service'],['securityCode','Security code'],['status','Status'],['notes','Notes','textarea']]}
}

function Shell(){const navigate=useNavigate();const [mobile,setMobile]=useState(false);const admin=JSON.parse(localStorage.getItem('tmg_admin')||'{}');const logout=()=>{localStorage.removeItem('tmg_token');localStorage.removeItem('tmg_admin');navigate('/admin/login')};return <div className="admin-shell"><aside className={mobile?'show':''}><div className="admin-brand"><img src="/images/tmg-logo-banner.jpg" alt="TMG"/></div>{nav.map(([label,to,Icon])=><NavLink key={to} to={to} end={to==='/admin'} onClick={()=>setMobile(false)}><Icon size={17}/>{label}</NavLink>)}<button className="logout" onClick={logout}><LogOut size={17}/>Sign out</button></aside><div className="admin-main"><header className="admin-top"><button className="menu-btn admin-menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><div><span className="eyebrow">TMG ADMIN</span><strong>Church Management System</strong></div><div className="admin-user"><ShieldCheck size={16}/>{admin.email||'Administrator'} · {admin.role||'admin'}</div></header><div className="admin-content"><Routes><Route index element={<Dashboard/>}/><Route path="settings" element={<SettingsPage/>}/><Route path="analytics" element={<Analytics/>}/><Route path="activity" element={<Activity/>}/><Route path="notifications" element={<Notifications/>}/><Route path="admins" element={<Admins/>}/><Route path="registrations" element={<Registrations/>}/><Route path="donations" element={<Donations/>}/><Route path="messages" element={<Inbox title="Contact Messages" endpoint="messages"/>}/><Route path="prayers" element={<Inbox title="Prayer Requests" endpoint="prayers" prayer/>}/><Route path="subscribers" element={<Inbox title="Newsletter Subscribers" endpoint="subscribers" subscriber/>}/>{Object.values(configs).map(c=><Route key={c.endpoint} path={c.endpoint} element={<Crud {...c}/>}/>)}</Routes></div></div></div>}

function Dashboard(){const [stats,setStats]=useState(null);const [notes,setNotes]=useState([]);useEffect(()=>{Promise.all([api.get('/dashboard/stats'),api.get('/notifications')]).then(([a,b])=>{setStats(a.data);setNotes(b.data.slice(0,5))}).catch(()=>{})},[]);return <div><div className="admin-title"><div><span className="eyebrow">COMMAND CENTER</span><h1>Good to see you.</h1><p>TMG website and church operations at a glance.</p></div></div><div className="stats-grid">{[['Sermons','sermons'],['Events','events'],['Members','members'],['Prayer Requests','prayers'],['Follow-ups','followups'],['Registrations','registrations'],['Successful donations','donations'],['Donation volume',null]].map(([l,k],i)=><div className="stat-card" key={l}><span>{l}</span><strong>{i===7?(stats?`₦${Number(stats.revenue||0).toLocaleString()}`:'—'):(stats?.[k]??'—')}</strong></div>)}</div><div className="admin-two admin-dashboard-grid"><div className="admin-panel"><h3>Quick actions</h3><div className="quick-actions"><NavLink to="/admin/sermons"><BookOpen size={18}/> Add sermon</NavLink><NavLink to="/admin/events"><CalendarDays size={18}/> Add event</NavLink><NavLink to="/admin/members"><UserPlus size={18}/> Add member</NavLink><NavLink to="/admin/announcements"><Megaphone size={18}/> Post announcement</NavLink><NavLink to="/admin/donations"><WalletCards size={18}/> View giving</NavLink><NavLink to="/admin/followups"><HandHeart size={18}/> Manage follow-up</NavLink></div></div><div className="admin-panel"><h3>Recent notifications</h3>{notes.length?notes.map(n=><div className="message" key={n._id}><strong>{n.title}</strong><p>{n.message}</p></div>):<p className="muted">No new notifications.</p>}</div></div></div>}

function Crud({label,endpoint,fields}){
  const [items,setItems]=useState([])
  const [form,setForm]=useState({})
  const [editing,setEditing]=useState(null)
  const [error,setError]=useState('')
  const [uploading,setUploading]=useState(false)
  const [uploadProgress,setUploadProgress]=useState(0)

  const load=()=>{
    return api.get('/'+endpoint).then(r=>setItems(r.data))
  }

  useEffect(()=>{
    load().catch(e=>setError(getError(e)))
  },[endpoint])

  /*
    Cloudinary configuration
  */
  const CLOUDINARY_CLOUD_NAME='x63cq8yl'
  const CLOUDINARY_UPLOAD_PRESET='tmg_ministries'

  /*
    Upload image to Cloudinary
  */
  const uploadToCloudinary=async(file)=>{
    if(!file)return

    if(!file.type.startsWith('image/')){
      setError('Please select an image file.')
      return
    }

    const maxSize=5*1024*1024

    if(file.size>maxSize){
      setError('Image must be smaller than 5MB.')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError('')

    try{
      const data=new FormData()

      data.append('file',file)
      data.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)

      const xhr=new XMLHttpRequest()

      const imageUrl=await new Promise((resolve,reject)=>{

        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        )

        xhr.upload.addEventListener('progress',event=>{
          if(event.lengthComputable){
            const progress=Math.round(
              (event.loaded/event.total)*100
            )

            setUploadProgress(progress)
          }
        })

        xhr.onload=()=>{
          try{
            const response=JSON.parse(xhr.responseText)

            if(xhr.status>=200 && xhr.status<300){
              resolve(response.secure_url)
            }else{
              reject(
                new Error(
                  response.error?.message ||
                  'Cloudinary upload failed.'
                )
              )
            }
          }catch{
            reject(
              new Error('Could not process Cloudinary response.')
            )
          }
        }

        xhr.onerror=()=>{
          reject(
            new Error('Could not connect to Cloudinary.')
          )
        }

        xhr.send(data)
      })

      /*
        Automatically place the Cloudinary URL
        into the correct field.
      */
      let imageField=null

      if(endpoint==='sermons'){
        imageField='thumbnail'
      }

      if(endpoint==='events'){
        imageField='image'
      }

      if(endpoint==='ministries'){
        imageField='image'
      }

      if(imageField){
        setForm(prev=>({
          ...prev,
          [imageField]:imageUrl
        }))
      }

      setUploadProgress(100)

    }catch(error){
      console.error('Cloudinary upload error:',error)
      setError(error.message||'Image upload failed.')
    }finally{
      setUploading(false)
    }
  }

  const save=async e=>{
    e.preventDefault()

    try{

      const payload={...form}

      if(payload.tags){
        payload.tags=payload.tags
          .split(',')
          .map(x=>x.trim())
          .filter(Boolean)
      }

      /*
        Don't allow the record to be saved while
        an image is still uploading.
      */
      if(uploading){
        setError('Please wait for the image upload to finish.')
        return
      }

      if(editing){
        await api.put(
          '/'+endpoint+'/'+editing,
          payload
        )
      }else{
        await api.post(
          '/'+endpoint,
          payload
        )
      }

      setForm({})
      setEditing(null)
      setError('')
      setUploadProgress(0)

      await load()

    }catch(e){
      setError(getError(e))
    }
  }

  const remove=async id=>{
    if(!confirm('Delete this record?'))return

    try{
      await api.delete('/'+endpoint+'/'+id)
      load()
    }catch(e){
      setError(getError(e))
    }
  }

  /*
    Determines whether this field is an image
    upload field.
  */
  const isImageField=(key)=>{
    return (
      (endpoint==='sermons' && key==='thumbnail') ||
      (endpoint==='events' && key==='image') ||
      (endpoint==='ministries' && key==='image')
    )
  }

  return (
    <div>

      <div className="admin-title">
        <div>
          <span className="eyebrow">
            MANAGEMENT
          </span>

          <h1>{label}</h1>

          <p>
            Create, edit, publish and maintain records.
          </p>
        </div>
      </div>


      <div className="admin-two">

        {/* ============================
            FORM
        ============================= */}

        <form
          className="admin-panel form-card"
          onSubmit={save}
        >

          <h3>
            {editing?'Edit':'Add'} {label.replace(/s$/,'')}
          </h3>


          {fields.map(([key,name,type])=>{

            /*
              IMAGE UPLOAD FIELD
            */
            if(isImageField(key)){

              return (
                <div
                  key={key}
                  className="admin-upload-field"
                >

                  <label>
                    {name}
                  </label>

                  <div className="upload-box">

                    <input
                      id={`upload-${key}`}
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={e=>{
                        const file=e.target.files?.[0]

                        if(file){
                          uploadToCloudinary(file)
                        }
                      }}
                    />

                    <label
                      htmlFor={`upload-${key}`}
                      className="upload-button"
                    >
                      {uploading
                        ? `Uploading ${uploadProgress}%`
                        : 'Choose Image'}
                    </label>

                    {uploading && (
                      <div className="upload-progress">
                        <div
                          className="upload-progress-bar"
                          style={{
                            width:`${uploadProgress}%`
                          }}
                        />
                      </div>
                    )}

                  </div>


                  {/* IMAGE PREVIEW */}

                  {form[key] && (
                    <div className="thumbnail-preview">

                      <img
                        src={form[key]}
                        alt={`${name} preview`}
                      />

                      <div className="thumbnail-preview-info">

                        <span>
                          ✓ Image uploaded
                        </span>

                        <button
                          type="button"
                          onClick={()=>{
                            setForm(prev=>({
                              ...prev,
                              [key]:''
                            }))
                          }}
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              )
            }


            /*
              NORMAL TEXT / TEXTAREA FIELD
            */

            return (
              <label key={key}>
                {name}

                {type==='textarea' ? (

                  <textarea
                    rows="4"
                    value={form[key]??''}
                    onChange={e=>
                      setForm({
                        ...form,
                        [key]:e.target.value
                      })
                    }
                  />

                ) : (

                  <input
                    value={form[key]??''}
                    onChange={e=>
                      setForm({
                        ...form,
                        [key]:e.target.value
                      })
                    }
                  />

                )}

              </label>
            )
          })}


          <div className="admin-form-actions">

            <button
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading
                ? 'Uploading image...'
                : editing
                ? 'Update'
                : 'Save'}
            </button>


            {editing && (

              <button
                type="button"
                className="btn btn-outline"
                onClick={()=>{
                  setEditing(null)
                  setForm({})
                  setError('')
                  setUploadProgress(0)
                }}
              >
                Cancel
              </button>

            )}

          </div>


          {error && (
            <p className="error">
              {error}
            </p>
          )}

        </form>


        {/* ============================
            EXISTING RECORDS
        ============================= */}

        <div className="admin-panel">

          <h3>
            Current records · {items.length}
          </h3>


          {items.length===0 ? (

            <p className="muted">
              Nothing added yet.
            </p>

          ) : (

            items.map(item=>(
              <div
                className="list-row"
                key={item._id}
              >

                {/* THUMBNAIL IN ADMIN LIST */}

                {(endpoint==='sermons' && item.thumbnail) ||
                (endpoint==='events' && item.image) ||
                (endpoint==='ministries' && item.image) ? (

                  <img
                    src={
                      endpoint==='sermons'
                        ? item.thumbnail
                        : item.image
                    }
                    alt=""
                    style={{
                      width:'64px',
                      height:'64px',
                      objectFit:'cover',
                      borderRadius:'10px',
                      marginRight:'12px'
                    }}
                  />

                ) : null}


                <div>

                  <strong>
                    {
                      item.title ||
                      item.name ||
                      `${item.firstName||''} ${item.lastName||''}`.trim() ||
                      'Untitled'
                    }
                  </strong>

                  <span>
                    {
                      item.speaker ||
                      item.position ||
                      item.date ||
                      item.status ||
                      item.category ||
                      item.email ||
                      ''
                    }
                  </span>

                </div>


                <div className="row-actions">

                  <button
                    onClick={()=>{
                      setEditing(item._id)

                      setForm(
                        Object.fromEntries(
                          fields.map(([k])=>[
                            k,
                            Array.isArray(item[k])
                              ? item[k].join(', ')
                              : (item[k]??'')
                          ])
                        )
                      )

                      window.scrollTo({
                        top:0,
                        behavior:'smooth'
                      })
                    }}
                  >
                    Edit
                  </button>


                  <button
                    onClick={()=>
                      remove(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))

          )}

        </div>

      </div>

    </div>
  )
}

function Inbox({title,endpoint,prayer,subscriber}){const [items,setItems]=useState([]);const load=()=>api.get('/'+endpoint).then(r=>setItems(r.data));useEffect(()=>{load().catch(()=>{})},[endpoint]);const update=async(id,body)=>{await api.put('/'+endpoint+'/'+id,body);load()};return <div><div className="admin-title"><div><span className="eyebrow">{subscriber?'AUDIENCE':prayer?'CARE':'INBOX'}</span><h1>{title}</h1></div></div><div className="admin-panel">{items.length===0?<p className="muted">No submissions yet.</p>:items.map(i=><article className="message" key={i._id}><div><strong>{i.name||i.email||'Anonymous'}</strong><span>{i.email||''}</span></div><p>{i.message||i.request||i.email}</p><div className="row-actions">{prayer&&['New','Praying','Completed','Archived'].map(s=><button key={s} onClick={()=>update(i._id,{status:s})}>{s}</button>)}{!subscriber&&<button onClick={()=>update(i._id,{read:true,archived:true})}>Archive</button>}</div><small>{i.createdAt?new Date(i.createdAt).toLocaleString():''}</small></article>)}</div></div>}

function Registrations(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/event-registrations').then(r=>setItems(r.data)).catch(()=>{})},[]);return <SimpleTable title="Event Registrations" items={items} columns={['eventTitle','name','email','phone','status','createdAt']}/>}
function Donations(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/donations').then(r=>setItems(r.data)).catch(()=>{})},[]);return <SimpleTable title="Giving & Donations" items={items} columns={['reference','name','email','type','amount','currency','status','paidAt']}/>}
function SimpleTable({title,items,columns}){return <div><div className="admin-title"><div><span className="eyebrow">REPORTING</span><h1>{title}</h1><p>{items.length} records</p></div></div><div className="admin-panel table-wrap"><table><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{items.map(x=><tr key={x._id}>{columns.map(c=><td key={c}>{c==='amount'?`₦${Number(x[c]||0).toLocaleString()}`:c.includes('At')&&x[c]?new Date(x[c]).toLocaleString():String(x[c]??'')}</td>)}</tr>)}</tbody></table></div></div>}
function Analytics(){return <div><div className="admin-title"><div><span className="eyebrow">INSIGHTS</span><h1>Analytics</h1><p>Connect Google Analytics or a privacy-conscious provider for traffic insights.</p></div></div><div className="admin-panel analytics-placeholder"><BarChart3 size={34}/><h3>Analytics center</h3><p>Application-level metrics such as members, registrations, prayers and giving are already available on the dashboard. External visitor analytics can be connected in production.</p></div></div>}
function Activity(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/activity').then(r=>setItems(r.data)).catch(()=>{})},[]);return <SimpleTable title="Activity Log" items={items} columns={['adminEmail','action','resource','resourceId','createdAt']}/>}
function Notifications(){const [items,setItems]=useState([]);const load=()=>api.get('/notifications').then(r=>setItems(r.data));useEffect(()=>{load().catch(()=>{})},[]);return <div><div className="admin-title"><div><span className="eyebrow">ALERTS</span><h1>Notifications</h1></div></div><div className="admin-panel">{items.map(n=><article className={`message ${n.read?'':'unread'}`} key={n._id}><strong>{n.title}</strong><p>{n.message}</p><button onClick={async()=>{await api.put('/notifications/'+n._id,{read:true});load()}}>Mark read</button></article>)}</div></div>}
function Admins(){const [items,setItems]=useState([]);const [form,setForm]=useState({role:'editor'});const load=()=>api.get('/admins').then(r=>setItems(r.data));useEffect(()=>{load().catch(()=>{})},[]);const save=async e=>{e.preventDefault();await api.post('/admins',form);setForm({role:'editor'});load()};return <div><div className="admin-title"><div><span className="eyebrow">SECURITY</span><h1>Admin Users</h1><p>Only Super Admins can manage administrator accounts.</p></div></div><div className="admin-two"><form className="admin-panel form-card" onSubmit={save}><h3>Add administrator</h3>{['name','email','password'].map(k=><label key={k}>{k}<input type={k==='password'?'password':'text'} value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})} required/></label>)}<label>Role<select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="editor">Editor</option><option value="admin">Admin</option><option value="super_admin">Super Admin</option></select></label><button className="btn btn-primary">Create admin</button></form><div className="admin-panel">{items.map(x=><div className="list-row" key={x._id}><div><strong>{x.name||x.email}</strong><span>{x.email} · {x.role}</span></div></div>)}</div></div></div>}
function SettingsPage(){const [settings,setSettings]=useState({churchName:'TMG Ministries',fullName:'Throne of Mercy and Glory Ministries',phone:'0803 060 5791',address:'KM 14 Warri-Patani Rd, Ughelli 333105, Delta',mapsUrl:'https://www.google.com/maps/place/TMG+MINISTRIES/@5.5472703,5.9167004,924m/',currency:'NGN'});useEffect(()=>{api.get('/settings').then(r=>setSettings(s=>({...s,...r.data}))).catch(()=>{})},[]);const save=async e=>{e.preventDefault();await api.put('/settings',settings);alert('Settings saved.')};return <div><div className="admin-title"><div><span className="eyebrow">CONFIGURATION</span><h1>Site settings</h1><p>Official church information, SEO/giving configuration and service details.</p></div></div><form className="admin-panel form-card narrow" onSubmit={save}>{[['churchName','Church name'],['fullName','Full legal/full name'],['phone','Phone'],['email','Official email'],['address','Address'],['mapsUrl','Google Maps URL'],['givingInfo','Giving information','textarea'],['vision','Vision','textarea'],['mission','Mission','textarea'],['beliefs','Beliefs','textarea'],['footerInfo','Footer information','textarea'],['paystackPublicKey','Paystack public key']].map(([k,l,t])=><label key={k}>{l}{t==='textarea'?<textarea rows="4" value={settings[k]||''} onChange={e=>setSettings({...settings,[k]:e.target.value})}/>:<input value={settings[k]||''} onChange={e=>setSettings({...settings,[k]:e.target.value})}/>}</label>)}<button className="btn btn-primary">Save settings</button></form></div>}
export default function Admin(){if(!localStorage.getItem('tmg_token'))return <LoginRedirect/>;return <Shell/>}function LoginRedirect(){const navigate=useNavigate();useEffect(()=>navigate('/admin/login',{replace:true}),[navigate]);return null}
