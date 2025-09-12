import { useUser, useClerk, Protect } from '@clerk/clerk-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Eraser, FileText, Hash, House, Scissors, SquarePen, Users, Image, LogOut } from 'lucide-react'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-title', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center">
      <div className="my-7 w-full">
        {user && (
          <>
            <img
              src={user.imageUrl}
              alt="User avatar"
              className="w-13 rounded-full mx-auto"
            />
            <h1 className="mt-1 text-center">{user.fullName}</h1>
          </>
        )}

        <div className="mt-5 flex flex-col gap-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-gray-200 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
  <div onClick={openUserProfile} className='flex gap-2 items-center justify-between cursor-pointer'>
    <img src={user.imageUrl} alt="User avatar" className="w-8 h-8 rounded-full" />
    <div>
      <h1 className='text-gray-700'>{user.fullName}</h1>
      <p>
        <Protect plan={user.plan} fallback={<span className='text-gray-500'>Free Plan</span>}>
          <span className='text-gray-500'>{user.plan}</span>
        </Protect>
      </p>
    </div>
  </div>
  
  <button onClick={signOut}>
    <LogOut className="w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer" />
  </button>
</div>

    </div>
  )
}

export default Sidebar
