import { useState } from "react"
import { TailSpin } from "react-loader-spinner"
import {Menu, Transition} from '@headlessui/react'
import $ from 'jquery'
import Cookie from 'js-cookie'
export default function Reviews({reviews, botdata}){
    const [botReviews, setBotReviews] = useState(reviews)
    const [content, setcontent] = useState('')
    const [posting, setposting] = useState(false)
    return(<>
        <div className="bg-zinc-500/20 dark:bg-zinc-700/5 p-4 mt-4 rounded-lg border border-zinc-600/10 text-black dark:text-zinc-300 transition-all duration-200 rounded-lg p-5">
            <h3 className="text-2xl font-semibold">Reviews</h3>
            <div className='mt-5'>
                {reviews.length != 0 ? 
                    reviews.map((review)=>{
                      return(<div className="flex w-full py-4 px-3 rounded-lg transition ease-in-out duration-500 hover:bg-slate-200 hover:dark:bg-gray-900/50">
                        <img src={review.avatar} className="rounded-full h-12 w-12"/>
                        <div className="ml-4 flex flex-col">
                            <p className="text-lg">{review.name} #{review.discriminator}</p>
                            <p className="mt-2 text-black/70 dark:text-white/70">{review.content}</p>
                        </div>
                        <div className="ml-auto">
                        <Menu as="div" className="relative inline-block text-left">
                        <div>
                        <Menu.Button className="flex items-center justify-center h-10 w-10 hover:dark:bg-gray-900 rounded-lg transition ease-in-out duration-300">
                            <i class="fas fa-ellipsis-h"></i>
                        </Menu.Button>
                        </div>
                        <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900">
                            <div className="px-1 py-1 ">
                            {review.token == Cookie.get('token') &&
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-sky-500 text-white' : 'dark:text-white'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <i className='fal fa-pen mr-2'/> Edit
                                </button>
                                )}
                            </Menu.Item>
                            }
                            
                            {review.token == Cookie.get('token') &&
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={()=>{  
                                        $.ajax({
                                            url: `https://api.somelist.tk/reviews/${botdata.id}/delete?reviewid=${review.id}&token=${Cookie.get('token')}`,
                                            type: 'GET',
                                        }).then((res)=>{
                                            setposting(false)
                                            if (res.reply == 'OK'){
                                                window.location.reload()
                                            } else {
                                                console.log(res.reply)
                                            }
                                        })
                                    }}
                                    className={`${
                                    active ? 'bg-red-600 text-white' : 'text-red-500 dark:text-red-400'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <i className='fal fa-trash mr-2'/> Delete
                                </button>
                                )}
                            </Menu.Item>
                            }
                            {review.token != Cookie.get('token') &&
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-red-600 text-white' : 'text-red-500 dark:text-red-400'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <i className='fal fa-flag mr-2'/> Report
                                </button>
                                )}
                            </Menu.Item>
                            }
                            </div>
                        </Menu.Items>
                        </Transition>
                        </Menu>
                        </div>
                    </div>)  
                    })
                :
                <>
                <p className="text-center text-3xl text-sky-500 italic font-semibold">Oops!</p>
                <p className="text-lg text-black/70 dark:text-white/70 text-center mt-4">No reviews were found. Add one below!</p>
                </>
                }
            </div>
            <form id='reviewsSubmission' className="mt-10 flex flex-col" onSubmit={(e)=>{
                    e.preventDefault()
                    setposting(true)
                    $.ajax({
                        url: `https://api.somelist.tk/reviews/${botdata.id}/add?token=${Cookie.get('token')}`,
                        type: 'POST',
                        data: $('#reviewsSubmission').serialize()
                    }).then((res)=>{
                        setposting(false)
                        if (res.reply == 'OK'){
                            window.location.reload()
                        } else {
                            console.log(res.reply)
                        }
                    })
                
            }}>
                <label className="ml-1 text-md">Post a review</label>
                <textarea value={content} onChange={(e)=> setcontent(e.target.value)} name="content" id="content" resize='false' className="bg-zinc-400/30 dark:bg-zinc-700/50 mt-2 rounded-lg w-full p-4 border focus:border-sky-500 outline-0" placeholder="Type your review here! Give your honest opinions."></textarea>
                <button className="ml-auto text-white mt-4 px-4 py-3 bg-sky-600 rounded-lg disabled:bg-zinc-400 disabled:text-black disabled:dark:bg-zinc-700 disabled:dark:text-white transition ease-in-out duration-500" disabled={content.length < 1 || posting}>{posting ? <TailSpin color='#fff' height='25px' w='25px'/> : 'Post Review'}</button>
            </form>
        </div>
        </>)
}