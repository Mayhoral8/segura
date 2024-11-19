"use client"
import React, {useState, useEffect, useContext} from 'react'
import Modal from '@/components/modal'
import SignoutModal from '../auth/signoutModal'
import { ConfigContext } from '@/contexts/ConfigContext'

const page = () => {
  const [showModal, setShowModal] = useState(false)
  const {showSignOutModal, setShowSignOutModal} = useContext(ConfigContext)

  useEffect(()=>{
    setShowModal(true)
},[])
  return (
    <div>
     { showModal && <Modal setShowModal={setShowModal}/>}
      
    </div>
  )
}

export default page