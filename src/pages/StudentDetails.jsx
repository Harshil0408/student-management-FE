import React, { useEffect, useRef, useState } from 'react';
import Header from '../components-main/students/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetailThunk } from '../store/thunks/studentThunk';
import { setChanges } from '../store/slices/studentSlice';
import {
    Tabs, TabsList, TabsTrigger, TabsContent
} from "@/components/ui/tabs";
import Profile from './Profile';
import Enrollment from './Enrollment';
import Residential from './Residential';
import PostResidential from './PostResidential';
import Counseling from './Counseling';
import Incidents from './Incidents';
import Medical from './Medical';
import { Button } from '../components/ui/button';
import { ExportSvg, PrintSvg, SaveSvg } from '../assets/svg/Svg';
import { Spin } from 'antd';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { toast } from 'sonner';

const StudentDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.student);
    const studentDetail = useSelector(state => state.student.studentInfo.demographicsTab.userProfileData);
    const { changes } = useSelector(state => state.student);

    const [currentTab, setCurrentTab] = useState("profile");
    const [pendingTab, setPendingTab] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const profileRef = useRef();
    const enrollmentRef = useRef();
    const residentialRef = useRef();

    useEffect(() => {
        dispatch(getStudentDetailThunk(id)).unwrap()
    }, [dispatch, id]);

    const fullname = studentDetail?.user_info?.first_name + " " + studentDetail?.user_info?.last_name;

    const handleGlobalSave = async () => {
        try {
            let saveSuccessful = true;

            if (currentTab === "profile") {
                saveSuccessful = await profileRef.current.saveChanges();
            }
            if (currentTab === "enrollment") {
                saveSuccessful = await enrollmentRef.current.saveChanges();
            }
            if (currentTab === "residential") {
                saveSuccessful = await residentialRef.current.saveChanges();
            }

            if (saveSuccessful) {
                await dispatch(getStudentDetailThunk(id)).unwrap();
                dispatch(setChanges(0));
            }
        } catch (error) {
            console.error('Failed to save changes:', error);
            toast.error('Failed to save changes');
        }
    };

    const resetFormData = (tabName) => {
        switch (tabName) {
            case "profile":
                if (profileRef.current?.resetForm) {
                    profileRef.current.resetForm();
                }
                break;
            case "enrollment":
                if (enrollmentRef.current?.resetForm) {
                    enrollmentRef.current.resetForm();
                }
                break;
            case "residential":
                if (residentialRef.current?.resetForm) {
                    residentialRef.current.resetForm();
                }
                break;
            default:
                break;
        }
    };

    const handleTabChange = (value) => {
        if (changes > 0) {
            setPendingTab(value);
            setShowConfirmation(true);
        } else {
            setCurrentTab(value);
        }
    };

    const handleConfirmTabChange = () => {
        resetFormData(currentTab);
        dispatch(setChanges(0));
        dispatch(getStudentDetailThunk(id)).unwrap()
            .then(() => {
                setCurrentTab(pendingTab);
                setPendingTab(null);
                setShowConfirmation(false);
            })
            .catch(console.error);
    };

    const handleCancelTabChange = () => {
        setPendingTab(null);
        setShowConfirmation(false);
    };

    return (
        <div className='lg:ml-14 px-6'>
            <Header
                headerText={fullname}
                description={studentDetail?.user_info?.email}
            />

            <div>
                <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                    <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
                        <TabsList className="flex-wrap">
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="profile">Profile</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="enrollment">Enrollment</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="residential">Residential</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="post-residential">Post Residential</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="counseling">Counseling</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="incidents">Incidents</TabsTrigger>
                            <TabsTrigger className='text-gray-600 cursor-pointer px-3' value="medical">Medical</TabsTrigger>
                        </TabsList>

                        <div className="flex gap-2">
                            <p className='text-sm text-muted-foreground px-2 pb-2 text-right'>
                                {`${changes} unsaved changes`}
                            </p>
                            <Button className='cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm'>
                                <PrintSvg /> Print
                            </Button>
                            <Button className='cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm'>
                                <ExportSvg /> Export
                            </Button>
                            <Button
                                onClick={handleGlobalSave}
                                disabled={changes < 1}
                                className='cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm'
                            >
                                {isLoading ? (
                                    <Spin
                                        className="mr-2"
                                        size="small"
                                        indicator={<div className="w-4 h-4 rounded-full border-t-2 border-t-black border-b-transparent animate-spin"></div>}
                                    />
                                ) : (
                                    <SaveSvg className="h-4 w-4 mr-2" />
                                )}
                                Save
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="profile"><Profile ref={profileRef} /></TabsContent>
                    <TabsContent value="enrollment"><Enrollment ref={enrollmentRef} /></TabsContent>
                    <TabsContent value="residential"><Residential ref={residentialRef} /></TabsContent>
                    <TabsContent value="post-residential"><PostResidential /></TabsContent>
                    <TabsContent value="counseling"><Counseling /></TabsContent>
                    <TabsContent value="incidents"><Incidents /></TabsContent>
                    <TabsContent value="medical"><Medical /></TabsContent>
                </Tabs>
            </div>

            <ConfirmationModal
                isOpen={showConfirmation}
                onConfirm={handleConfirmTabChange}
                onCancel={handleCancelTabChange}
                title="Unsaved Changes"
                description="You have unsaved changes that will be lost if you leave this tab. Are you sure you want to continue?"
            />
        </div>
    );
};

export default StudentDetails;
