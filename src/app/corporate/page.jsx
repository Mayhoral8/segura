"use client"
import React, {useState, useEffect} from 'react'
import Modal from '@/components/modal'

const page = () => {
  const [showModal, setShowModal] = useState(false)

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