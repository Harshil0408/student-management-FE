import React from 'react'
import Header from '../components-main/students/Header'
import StudentList from '../components-main/students/StudentList'

const Students = () => {
    return (
        <div className="lg:ml-14 px-6">
            <div className="min-h-screen bg-background px-4">
                <Header
                    headerText={"Students"}
                    description={"Manage student profiles, view their status and quickly access detailed information. Use the options below to add new students, filter the list or export data."}
                />
                <StudentList />
            </div>
        </div>
    )
}

export default Students