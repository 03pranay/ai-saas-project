import { Edit, Sparkle } from 'lucide-react'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL 
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

const WriteArticle = () => {
  const articlelength = [
    {length: 800, text: 'short (500-800 words)'},
    {length: 1200, text: 'medium (800-1200 words)'},
    {length: 1600, text: 'long (1200+ words)'}
  ]
  const [selectedLength, setSelectedLength] = useState(articlelength[0])
  const [input, setInput] = useState('' )
  const [Loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const {getToken} = useAuth();
  const submitHandler = async (e) => {
   
    e.preventDefault()
    try {
      
      setLoading(true)
      const prompt = `Write a detailed, ${selectedLength.text} article about ${input}.`
      const {data} = await axios.post('/api/ai/generate-article', {prompt, length: selectedLength.length}, {
        headers: {Authorization: `Bearer ${await getToken()}`}    
      })
      if(data.success){
        setContent(data.content)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' onSubmit={submitHandler}>
        <div className='flex items-center gap-2'>
          <Sparkle className='w-6 text-[#1E40AF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>

        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type='text' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Enter article topic' required />
        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articlelength.map((item, index)=>(
            <span onClick={() => setSelectedLength(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} key={index}>{item.text}</span>
          ))}
        </div>
        <br />
        <button disabled={Loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white py-2 px-4 mt-6 text-sm rounded-lg cursor-pointer'>
          {Loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          :  <Edit className='w-5' />
          }

          
          Generate Article
        </button>

      </form >
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
      <div className='flex items-center gap-3'>
        <Edit className='w-5 h-5 text-[#1E40AF]' />
        <h1 className='text-lg font-semibold'>Generated Article </h1>

      </div>
      {!content ?(
        <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Edit className='w-9 h-9' />
          <p>Enter a topic to and click "generate article" to see the result.</p>

        </div>
      </div>
      ):(
        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
          <div className='reset-tw'>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      )}
      
      </div>
      
    </div>
  )
}

export default WriteArticle