import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import BotCard from '../components/BotCard.jsx';
import HeaderB from '../components/Navbar.jsx';
import { motion } from 'framer-motion'
import $ from 'jquery'

export default function Home({ abots, lbots, isLoggedIn }) {
  const router = useRouter()

  const [search, setsearch] = useState(
    <>
      <div className='flex items-center w-full justify-center flex-col' style={{ height: '200px' }}>
        <Image src='/images/search.svg' height='200px' width='500px'></Image>
        <h1 className='text-2xl font-bold text-white/70 mt-4'>Type to search</h1>
      </div>
    </>
  )

  function changeInput(e) {
    if (document.getElementById('searchInput').value == "") {
      return setsearch(
        <div className='flex items-center w-full justify-center flex-col' style={{ height: '200px' }}>
          <Image src='/images/search.svg' height='200px' width='500px'></Image>
          <h1 className='text-2xl font-bold text-white/70 mt-4'>Type to search</h1>
        </div>
      )
    }

    let searchResults = []
    abots.map((bot) => {
      if (bot.approved) {
        const botname = bot.name.toLowerCase().split('')
        let howmuch = 0
        botname.forEach((item, index) => document.getElementById('searchInput').value.includes(item) ? howmuch += 1 : null);
        if (howmuch / botname.length >= 0.5 && howmuch / botname.length <= 2) {
          searchResults.push(bot)
        } else {
          const botDesc = bot.shortdesc.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').split(' ')

          let match = 0
          botDesc.forEach((item, index) => document.getElementById('searchInput').value.includes(item) ? match += 1 : false);
          if (match / botDesc.length >= 0.25 && match / botDesc.length <= 2) searchResults.push(bot)
        }
      }
    });

    setsearch(
      <>
        {searchResults.length <= 0 ?
          <div className='flex items-center w-full justify-center flex-col' style={{ height: '200px' }}>
            <Image src='/images/404.svg' height='200px' width='500px'></Image>
            <h1 className='text-2xl font-bold text-white/70 mt-4'>No results found</h1>
          </div>
          :
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[20rem] gap-4 overflow-auto"
          >
            {searchResults.map((bot) => {
              return (<div onClick={() => { router.push('/bot/' + bot.id) }} className="p-4 gap-x-4 flex w-full hover:bg-zinc-500/5 transition-all duration-200 rounded-xl transiiton-all duration-200 cursor-pointer">
                <div className="w-[64px] h-[64px] rounded-full shadow-xl flex-shrink-0">
                  <div style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: '0px' }}>
                    <div style={{ boxSizing: 'border-box', display: 'block', maxSidth: '100%' }}>
                      <img style={{ maxWidth: '100%', display: 'block', margin: '0px', border: 'medium none', padding: '0px' }} className='rounded-full' alt="" aria-hidden="true" role="presentation" src={''} />
                    </div>
                    <Image alt="" src={bot.avatar} height='100%' width='100%' className="rounded-full" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'medium none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <h1 className="text-xl font-medium w-full line-clamp-1 break-words">{bot.name}</h1>
                    <span className="flex items-center font-medium bg-neutral-500/10 p-2 py-1 rounded-lg text-sm"><p>{bot.votes}</p><i className="fa fa-chevron-up ml-2"></i></span>
                  </div>
                  <p className="mt-2 text-sm text-black/75 dark:text-white/75 line-clamp-2 font-normal">{bot.shortdesc}</p>
                </div>
              </div>
              )
            })}
          </div>
        }
      </>
    )
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.q) setTimeout(() => {
      $('#searchInput').focus()
      $('#searchInput').val(router.query.q)
      changeInput()
    }, 1000)
  }, [router.isReady])

  const fitem = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 }
  };

  const zcontainer = {
    hidden: { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.05,
      }
    }
  }

  const zitem = { hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1 } }

  const [botsdata, setbotsdata] = useState([]);
  return (
    <>
      <HeaderB isLoggedIn={isLoggedIn} />
      <div className='p-5 lg:p-10 py-[10rem] lg:py-[10rem] rounded-lg min-h-screen	'>
        <div className="pb-24">
          <h1 className="text-4xl font-bold">Somelist</h1>
          <p className="text-2xl text-black/40 dark:text-white/40 font-medium">
            The best place for your online presence.
          </p>
          <div className="flex items-center gap-2">
            <motion.div className='w-full' animate={{ y: 0 }} initial={{ y: 100 }}>
              <div style={{ zIndex: '0' }} className="w-full relative">
                <input style={{ zIndex: '100' }} spellCheck="false" id="searchInput" disabled={botsdata == [] && true} onFocus={() => {
                    document.getElementById('search').style.display = 'block'
                    document.getElementById('search-backdrop').style.display = 'block'
                    document.getElementById('search').classList.add('search-show')
                  }} onChange={(e) => changeInput(e)} autoComplete="off" placeholder="Explore the bots by name and description..."
                  className="relative transition-all duration-200 my-2 w-full bg-black/10 dark:bg-black/30 dark:hover:bg-black/50 hover:bg-black/20 text-dark dark:text-white focus:text-sky-500 rounded-xl border border-white/10 focus:border-sky-500 outline-none py-4 px-6"/>
                <div>
                  <div>
                    <div style={{ zIndex: 99, display: 'none' }} className="left-0 top-0 bg-black/50 fixed w-screen h-screen" id='search-backdrop'
                      onClick={() => {
                        document.getElementById('search').style.display = 'none'
                        document.getElementById('search-backdrop').style.display = 'none'
                        document.getElementById('search').classList.remove('search-show')
                      }}></div>
                  </div>
                  <div>
                    <div style={{ zIndex: 99, display: 'none' }} className="backdrop-blur-lg rounded-lg p-4 bg-[#0B0A15]/50 absolute w-full" id='search'>
                      {search}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <button className="opacity-100 h-14 bg-gradient-to-br from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-xl shadow-sky-600/20">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <motion.div variants={{ hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: { delayChildren: 0.5, staggerChildren: 0.01 } } }} initial="hidden" animate="show">
            <div className="flex flex-wrap transition-all duration-200 items-center gap-2 justify-start">
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Moderation
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Fun
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Minecraft
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Economy
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Guard
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>NSFW
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Anime
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Music
                </div>
              </motion.div>
              <motion.div variants={fitem}>
                <div className="text-md bg-sky-600/5 border border-zinc-400/10 text-black dark:text-zinc-300 hover:border-zinc-400/20 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer rounded-lg px-3 py-1.5">
                  <span className="mr-1"><i className="fa fa-hashtag text-blurple-500/50"></i></span>Utility
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div>
          <p className="text-3xl italic font-semibold text-black/80 dark:text-white/80">Trending Bots</p>
          <p className="text-lg italic font-normal text-black/80 dark:text-white/80 mb-2">Most popular bots.</p>

          <motion.div variants={zcontainer} initial="hidden" animate="show">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5'>
              <motion.div variants={zitem}>
                <div style={{ zIndex: "10" }} className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-orange-900/10 rounded-lg">
                  <div className="bot-bg w-full h-full absolute rounded-lg" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: "blur(2px)", opacity: "50%" }}></div>
                  <div style={{ zIndex: '10' }} className="p-4 relative">
                    <div style={{ zIndex: '10' }} className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5">
                      <div style={{ zIndex: '10' }} className="bg-orange-800/20 flex items-center justify-center relative w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl">
                        <div style={{ zIndex: '10', display: "block", overflow: "hidden", position: "absolute", inset: "0px", boxSizing: "border-box", margin: "0px" }}>
                          <i className="text-orange-400 fad fa-sign" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "40px", height: "40px", fontSize: '40px' }}/>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-0 relative flex-shrink-0">
                        <p className="rounded-lg bg-sky-500 text-white dark:bg-orange-900/20 px-4 shadow-xl text-xl">Advertising space</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2">This could be you. Applying for advertising today, or purchase Somelist Premium.</p>
                    <div className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5">
                      <div onClick={() => router.push("/apply/ad")} className="w-full bg-orange-900/10 hover:bg-orange-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                        Apply
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {abots.map((bot) => {
                if (!bot.approved) return (<></>);
                return (
                  <motion.div variants={zitem}>
                    <BotCard name={bot.name} id={bot.id} votes={bot.votes} avatar={bot.avatar} banner={bot.banner} shortdesc={bot.shortdesc} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
        <div>
          <p className="text-3xl italic font-semibold text-black/80 dark:text-white/80">Lastest Bots</p>
          <p className="text-lg italic font-normal text-black/80 dark:text-white/80 mb-2">Latest bots added</p>
          <motion.div variants={zcontainer} initial="hidden" animate="show">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-5'>
              <motion.div variants={zitem}>
                <div style={{ zIndex: "10" }} className="cursor-pointer bot-card h-auto sm:h-48 group hover:shadow-xl transition-all duration-200 relative mt-14 w-full bg-orange-900/10 rounded-lg">
                  <div className="bot-bg w-full h-full absolute rounded-lg" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", filter: "blur(2px)", opacity: "50%" }}></div>
                  <div style={{ zIndex: '10' }} className="p-4 relative">
                    <div style={{ zIndex: '10' }} className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full sm:space-x-2 h-full -mt-14 mb-5">
                      <div style={{ zIndex: '10' }} className="bg-orange-800/20 flex items-center justify-center relative w-[76px] h-[76px] sm:ml-5 rounded-full drop-shadow-xl">
                        <div style={{ zIndex: '10', display: "block", overflow: "hidden", position: "absolute", inset: "0px", boxSizing: "border-box", margin: "0px"}}>
                          <i className="text-orange-400 fad fa-sign" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "40px", height: "40px", fontSize: '40px' }} />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-0 relative flex-shrink-0">
                        <p className="rounded-lg bg-sky-500 text-white dark:bg-orange-900/20 px-4 shadow-xl text-xl">Advertising space</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-800 dark:text-neutral-300 h-14 w-full line-clamp-2">This could be you. Applying for advertising today, or purchase Somelist Premium.</p>
                    <div className="sm:flex space-y-2 sm:space-y-0 justify-between w-full gap-x-4 text-center mt-5">
                      <div onClick={() => router.push("/apply/ad")} className="w-full bg-orange-900/10 hover:bg-orange-900/50 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg">
                        Apply
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {lbots.map((bot) => {
                if (!bot.approved) return (<></>);
                return (
                  <motion.div variants={zitem}>
                    <BotCard name={bot.name} id={bot.id} votes={bot.votes} avatar={bot.avatar} banner={bot.banner} shortdesc={bot.shortdesc} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const data = await fetch('https://api.somelist.tk/find_bots?limit=8').then(res => res.json()).catch(err => {
    console.log(`[Error]: ${err}`);
    return {
      bots: [],
      lbots: []
    };
  })

  return {
    props: {
      abots: data?.bots,
      lbots: data?.lbots,
      isLoggedIn: context.req.cookies.token ? true : false
    }
  }
}

