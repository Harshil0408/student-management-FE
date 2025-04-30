import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getApplicationStatusThunk } from '../store/thunks/studentThunk'
import ApplicationStatusTable from '../components-main/student-details/enrollment/ApplicationStatusTable'

const Enrollment = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  console.log("helo")

  const getApplicationStatusData = async () => {
    try {
      await dispatch(getApplicationStatusThunk({ studentId: id })).unwrap()
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getApplicationStatusData()
  }, [])

  return (
    <div>
      <ApplicationStatusTable />
    </div>
  )
}

export default Enrollment