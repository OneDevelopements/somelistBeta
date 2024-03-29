import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import Cookie from "js-cookie"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import $ from 'jquery'

import HeaderB from "../../components/Navbar.jsx"
import Reviews from "../../components/Reviews.jsx"
export default function BotPage({isLoggedIn, botdata}){
    const router = useRouter()

    let [isOpen, setIsOpen] = useState(false)
    const [dialogContent, setdialogContent] = useState('')
    const [refreshing, setrefreshing] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    return (
        <>
        <HeaderB isLoggedIn={isLoggedIn}/>
        <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            {botdata == 'none' ? (

            <div className='h-full flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-5xl italic text-sky-500 font-bold'>Oops!</h1>
                <br/>
                <p className='text-lg text-slate-300/90' >This bot might not exist, or may not be approved yet.</p>
            </div>
            </div> 
            )
            : 
            botdata.publicity == 'private' ? 
            botdata.owner != Cookie.get('id') && (
            <div className='h-full flex items-center justify-center'>
            <div className='text-center'>
                    <h1 className='text-5xl italic text-sky-500 font-bold'>Oops!</h1>
                    <br/>
                    <p className='text-lg text-slate-300/90' >This bot might not exist, or may not be approved yet.</p>
            </div>
            </div> 
            )
             : (

                <>

                <Head>
                    <title>Invite {botdata.name} on Somelist, your #1 trusted Discord Bot List</title>
                    <link rel="shortcut icon" type="image/png" href="https://i.imgur.com/eSgi8jm.png" />
                    <meta name="description" content={botdata.shortdesc} />
                    <meta name="og:description" content={botdata.shortdesc} />
                    <meta name="twitter:image" content={botdata.avatar} />
                </Head>
                {botdata.owner == Cookie.get('id') && 
                <button
                    style={{'zIndex': '100', 'float': 'right', 'bottom': '20px', 'right': '20px'}}
                    className="fixed opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-600/20"
                    onClick={()=> router.push(`/bot/${botdata.id}/edit`)}
                    type='button'
                >
                    <><i className="mr-2 fas fa-pen"></i><p className="font-semibold">Edit</p></>
                </button>
                }
                {!botdata.approved  && 
                <div style={{top:'100px', zIndex: '100'}} className='fixed mb-5 font-medium text-md bg-sky-600/50 p-4 rounded-xl px-6'><p>Your bot has not been approved yet. <a className={'font-semibold cursor-pointer'} onClick={()=> window.open('https://docs.somelist.tk')}>Learn more</a></p></div>}
                <div className="lg:flex items-center justify-between w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-x-4">
                        <div className="flex-shrink-0 z-1 w-[8rem] h-[8rem] hidden lg:block">
                        <div
                            style={{display: "inline-block", maxWidth: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                        >
                            <div style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}>
                            <img
                                style={{maxWidth: "100%", display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                                alt=""
                                aria-hidden="true"
                                role="presentation"
                                className='rounded-xl'
                                src = {botdata.avatar}
                            />
                            </div>
                            <img
                            alt="Bot's avatar"
                            decoding="async"
                            src={botdata.avatar}
                            
                            className="rounded-lg lg:rounded-full transition-all duration-150"
                            style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                            />
                        </div>
                        </div>
                <div className="flex-shrink-0 z-1 block w-[16rem] h-[16rem] mb-5 lg:hidden">
                        <div
                            style={{display: "inline-block", width: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                        >
                            <div style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}>
                            <img
                                style={{width:'100%', height: '100%',maxWidth: "100%", display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                                alt=""
                                aria-hidden="true"
                                className={'rounded-lg'}
                                role="presentation"
                                src = {botdata.avatar}
                            />
                            </div>
                            <img
                            alt="Bot's avatar"
                            decoding="async"
                            src={botdata.avatar}
                            className="rounded-lg lg:rounded-full transition-all duration-150"
                            style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                            
                            />
                        </div>
                        </div>
                        <div
                        className="flex justify-center flex-col text-center mb-2 lg:mb-0 lg:text-left items-center lg:items-start lg:justify-start w-full"
                        >
                        <div className='flex items-center'>
                        <p
                            className="flex items-center text-4xl font-medium text-black dark:text-white"
                        >
                            {botdata.name}

                        </p>
                        {botdata.owner == Cookie.get('id') && 
                            <button  
                            disabled={refreshing}
                            onClick={()=>{
                                setrefreshing(true)
                                $.ajax({
                                    url: 'https://api.somelist.tk/refreshbot?id='+botdata.id+'&token='+Cookie.get('token')
                                }).then((res)=>{
                                    setrefreshing(false)
                                    if(res.reply == 'worked'){
                                        window.location.reload()
                                    }
                                })
                            }}
                            className='ml-4 text-lg p-2 flex items-center justify-center h-12 w-12 rounded-lg bg-sky-700'><i className={`fas fa-sync ${refreshing && 'fa-spin'}`}/>
                            </button>
                        }
                        </div>
                        <div
                            className="flex items-center w-4/4 line-clamp-2 text-zinc-500 font-medium"
                        >
                            <p className="text-base">
                            {botdata.shortdesc}
                            </p>
                        </div>
                        </div>
                        
                    </div>
                    <div className="flex-shrink-0 lg:ml-56 flex items-center flex-col">
                        <button
                        onClick={()=>{window.open(botdata.invite)}}
                        className="flex justify-between items-center w-full lg:w-48 bg-sky-600/40 hover:bg-sky-600/70 transition-all duration-200 py-2 mt-2 px-6 text-lg rounded-lg text-black dark:text-white shadow-lg shadow-sky-600/10"
                        >
                        <i className="fab fa-discord left-0 mr-1"></i>Invite</button
                        ><button
                        onClick={()=>{
                            if (!Cookie.get('id')){
                                
                                setdialogContent(<><Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Oof!
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                    Thanks for being eager, but you need to login to vote!
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                    type="button"
                                    className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() =>{
                                        Cookie.set('redirect', '/bot/'+botdata.id)
                                        window.location.href='https://api.somelist.tk/login'
                                    }
                                    }
                                    >
                                    Login
                                    </button>
                                </div>
                                </>)
                                return openModal()
                            }
                            $.ajax({
                                url: 'https://api.somelist.tk/vote/'+botdata.id+'?user='+Cookie.get('id')+"&token="+Cookie.get('token')
                            }).then((res)=>{
                                if(res.result == 'TOKEN_INVALID'){
                                    setdialogContent(<><Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Whoops!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        We couldn't verify that your account is valid. You could try logging in again!
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                        type="button"
                                        className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                        >
                                        Ok
                                        </button>
                                    </div>
                                    </>)
                                }
                                if (res.result == 'WAIT'){

                                    setdialogContent(<><Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Woah! Slow down!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        We know you're very generous, but you've already voted for this bot in the past 12 hours!
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                        type="button"
                                        className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                        >
                                        Ok
                                        </button>
                                    </div>
                                    </>)
                                    openModal()
                                } else if (res.result == 'VALID'){
                                    setdialogContent(<><Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Vote saved!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        The owner of this bot says thanks! You can vote for this bot again in 12 hours!
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                        type="button"
                                        className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                        >
                                        Cool!
                                        </button>
                                    </div>
                                    </>)
                                    openModal()      
                                }
                            })
                        }}
                        className="flex justify-between items-center w-full lg:w-48 bg-zinc-600/20 hover:bg-zinc-600/40 transition-all duration-200 py-2 mt-2 px-6 text-lg rounded-lg text-black dark:text-white shadow-lg shadow-zinc-600/10"
                        >
                        <i className="fa fa-caret-up left-0 mr-1"></i>Vote ({botdata.votes})
                        </button>
                    </div>
                    </div>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-0 lg:gap-x-4 mt-20 lg:mt-28"
                        >
                        <div className="order-last lg:order-first col-span-9">
                            <div
                            className="bg-zinc-500/20 dark:bg-zinc-700/5 border border-zinc-600/10 text-black dark:text-zinc-300 transition-all duration-200 rounded-lg p-5"
                            >
                            <div className="w-full h-full" id='longdescwrapper' dangerouslySetInnerHTML={{ __html: botdata.longdesc }} style={{overflowWrap: 'break-word'}}>

                            </div>
                        </div>
                        <Reviews reviews={botdata.reviews} botdata={botdata}/>
                        </div>
                        <div className="col-span-3 w-full">
                            <div
                            className="w-full bg-zinc-500/20 dark:bg-zinc-700/5 border border-zinc-600/10 text-black dark:text-zinc-300 transition-all duration-200 rounded-lg p-5"
                            >
                            <div>
                                <h1 className="text-2xl mb-3">
                                <i className="fas fa-info-circle text-sky-500 mr-2"></i>Details
                                </h1>
                                <div className="flex items-center w-full">
                                <p className="text-lg">Prefix</p>
                                <span
                                    className="bg-zinc-600/20 px-2 py-1 rounded-lg text-black dark:text-zinc-400 text-sm ml-2"
                                    >{botdata.prefix}</span
                                >
                                </div>
                                <div className="flex items-center w-full mt-1">
                                <p className="text-lg">Monthly Votes</p>
                                <span
                                    className="bg-zinc-600/20 px-2 py-1 rounded-lg text-black dark:text-zinc-400 text-sm ml-2"
                                    >{botdata.votes}</span
                                >
                                </div>
                            </div>
                            <div className="mt-10">
                                <h1 className="text-2xl mb-3">
                                <i className="fas fa-users text-sky-500 mr-2"></i>Authors
                                </h1>
                                <div className="flex flex-col items-center w-full gap-x-2 gap-y-2">
                                <span
                                    onClick={()=>{router.push(`/profile/${botdata.owner}`)}}
                                    className="flex w-full items-center bg-zinc-600/20 hover:bg-zinc-600/30 px-2 cursor-pointer transition-all duration-150 py-1 rounded-lg text-black dark:text-zinc-400 text-sm"
                                    ><div className="flex-shrink-0 w-[3rem] h-[3rem]">
                                    <div
                                        style={{display: "inline-block", maxWidth: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                                        
                                    >
                                        <div
                                        style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}
                                        >
                                        <img
                                            style={{maxWidth: "100%", display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                                            alt=""
                                            className='rounded-full'
                                            src={botdata.ownerAvatar} 
                                            aria-hidden="true"
                                            role="presentation"
                                        />
                                        </div>
                                        <img
                                        alt="User's avatar"
                                        decoding="async"
                                        src={botdata.ownerAvatar} 
                                        className="rounded-full"
                                        style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                                        
                                        />
                                    </div>
                                    </div>
                                    <p className="text-lg ml-3 text-white">{botdata.ownerName}</p></span
                                >
                                </div>
                            </div>
                            <div className="mt-10">
                                <h1 className="text-2xl mb-3">
                                <i className="fas fa-tag text-sky-500 mr-2"></i>Tags
                                </h1>
                                <div
                                className="flex flex-row flex-wrap items-center w-full gap-x-2 gap-y-2"
                                >
                                
                                {botdata.tags && 
                                botdata.tags.map((tag)=>{
                                return(<span
                                    className="flex items-center bg-zinc-600/20 hover:bg-zinc-600/30 px-2 cursor-pointer transition-all duration-150 py-1 rounded-lg text-black dark:text-zinc-400 text-sm"
                                >
                                    {tag}
                                </span>)
                                })}
                                
                                </div>
                            </div>
                            <div className="mt-10">
                                <h1 className="text-2xl mb-3">
                                <i className="fas fa-external-link text-sky-500 mr-2"></i>Links
                                </h1>
                                <div
                                className="flex flex-row flex-wrap items-center w-full gap-x-2 gap-y-2"
                                >
                                {botdata.website &&
                                <a
                                    target="_blank"
                                    href={botdata.website}
                                    className="w-full text-black dark:text-white group"
                                    ><div className="flex items-center">
                                    <div
                                        className="rounded-l-lg text-center py-2 bg-zinc-600/30 transition-all duration-150 group-hover:bg-zinc-600/40 px-4 w-14"
                                    >
                                        <i className="fas fa-link"></i>
                                    </div>
                                    <div
                                        className="rounded-r-lg text-center py-2 bg-zinc-600/20 transition-all duration-150 group-hover:bg-zinc-600/30 px-2 w-full"
                                    >
                                        <p>Website</p>
                                    </div>
                                    <div></div></div></a
                                >
                                }
                                {botdata.github && 
                                <a
                                    target="_blank"
                                    href={botdata.github}
                                    className="w-full text-black dark:text-white group"
                                    ><div className="flex items-center">
                                    <div
                                        className="rounded-l-lg text-center py-2 bg-zinc-600/30 transition-all duration-150 group-hover:bg-zinc-600/40 px-4 w-14"
                                    >
                                        <i className="fab fa-github"></i>
                                    </div>
                                    <div
                                        className="rounded-r-lg text-center py-2 bg-zinc-600/20 transition-all duration-150 group-hover:bg-zinc-600/30 px-2 w-full"
                                    >
                                        <p>Repository</p>
                                    </div>
                                    <div></div></div></a
                                >
                                }
                                {botdata.support && <a
                                    target="_blank"
                                    href="https://discord.gg/PTAgf9yGkv"
                                    className="w-full text-black dark:text-white group"
                                    ><div className="flex items-center">
                                    <div
                                        className="rounded-l-lg text-center py-2 bg-zinc-600/30 transition-all duration-150 group-hover:bg-zinc-600/40 px-4 w-14"
                                    >
                                        <i className="fab fa-discord"></i>
                                    </div>
                                    <div
                                        className="rounded-r-lg text-center py-2 bg-zinc-600/20 transition-all duration-150 group-hover:bg-zinc-600/30 px-2 w-full"
                                    >
                                        <p>Support Server</p>
                                    </div>
                                    <div></div></div></a
                                >
                                }<a
                                    target="_blank"
                                    className="cursor-pointer w-full text-black dark:text-white group"
                                    ><div className="flex items-center">
                                    <div
                                        className="rounded-l-lg text-center py-2 bg-red-600/30 transition-all duration-150 group-hover:bg-red-600/40 px-4 w-14"
                                    >
                                        <i className="fa fa-bug"></i>
                                    </div>
                                    <div
                                        className="rounded-r-lg text-center py-2 bg-red-600/20 transition-all duration-150 group-hover:bg-red-600/30 px-2 w-full"
                                    >
                                        <p>Report</p>
                                    </div>
                                    <div></div></div>
                                </a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )
            
            }
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        {dialogContent}
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </div>
        </>
        )
}

export async function getServerSideProps(context) {
    const res = await fetch('https://api.somelist.tk/bot?user=' + context.query.id + '&requester=' + context.req.cookies.id + '&userview=true')
    const json = await res.json()
    if (json.result == 'none') {
        context.res.statusCode = 404
        return { notFound: true }
    }
    if (!json.result.approved) {
        return {
            redirect: {
                permanent: false,
                destination: "/403",
            },
        }
    }
    return {
        props: {
            botdata: json.result,
            isLoggedIn: context.req.cookies.token ? true : false
        }
    }
} 