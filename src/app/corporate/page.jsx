"use client"
import React, {useState, useEffect, useContext} from 'react'
import Modal from '@/components/modal'
import SignOutModal from '../auth/signoutModal'
import AuthGuard from '../auth/AuthGuard'

const page = () => {

  const [showModal, setShowModal] = useState(false)
  

  useEffect(()=>{
    setShowModal(true)
},[])


  return (
    <div>
     { showModal && <Modal setShowModal={setShowModal}/>}
     {/* <SignOutModal/> */}
      
    </div>
  )
}

export default page