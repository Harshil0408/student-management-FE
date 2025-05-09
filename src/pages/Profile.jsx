import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { setChanges } from '../store/slices/studentSlice';
import UserProfile from '../components-main/student-details/UserProfile';
import MentorsForm from '../components-main/student-details/MentorsForm';
import GuardianForm from '../components-main/student-details/GuardianForm';
import MentorsTable from '../components-main/student-details/MentorsTable';
import Demographics from '../components-main/student-details/Demographics';
import GuardianTable from '../components-main/student-details/GuardianTable';
import React, { useEffect, useImperativeHandle, useState, forwardRef, useRef } from 'react';
import { updateUserProfileTab, addGuardianThunk, getStudentDetailThunk, addMentorsThunk, updateGuardianThunk, updateMentorThunk, addStudentDemographicsThunk, updateStudentDemographicsThunk } from '../store/thunks/studentThunk';

const countDifferences = (dbData, formData) => {
    let changes = 0;
    const compareValues = (db, form) => {
        if (typeof db === 'object' && db !== null && typeof form === 'object' && form !== null) {
            Object.keys(form).forEach(key => {
                if (typeof form[key] === 'object' && form[key] !== null) {
                    compareValues(db[key], form[key]);
                } else if (db[key] !== form[key]) {
                    changes++;
                }
            });
        }
        else if (db !== form) {
            changes++;
        }
    };
    compareValues(dbData, formData);
    return changes;
};

const getInitialProfileData = (dbData) => (
    {
        user_info: {
            first_name: dbData?.user_info?.first_name || '',
            last_name: dbData?.user_info?.last_name || '',
            email: dbData?.user_info?.email || ''
        },
        phone: dbData?.phone || '',
        address: dbData?.address || '',
        city: dbData?.city || '',
        date_of_birth: dbData?.date_of_birth || null,
        state: dbData?.state || '',
        zip_code: dbData?.zip_code || '',
        gender: dbData?.gender || '',
        country: dbData?.country || '',
        referral_source: dbData?.referral_source || '',
        statement: dbData?.statement || ''
    });

const initialGuardianData = {
    guardian: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        household_income: "",
        snap_benifits: false,
    },
    relationship: "",
    legal_rights: false,
    emergency_contact: false,
    autorized_pickup: false,
    receives_mail: false,
    custody: false,
};

const initialMentorsData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    relationship: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    referral_source: '',
    proximity: '',
    expertise: '',
    marital_status: '',
    work_status: '',
    status: '',
    type: '',
    screened_date: '',
    employer: '',
    background_checked: false,
    trained: false,
    matched: false,
    status_notes: '',
}

const intialDemographicsData = (dbData) => ({
    hair_color: dbData?.demographicsDetails?.hair_color,
    eye_color: dbData?.demographicsDetails?.eye_color,
    wear_contacts: dbData?.demographicsDetails?.wear_contacts,
    wear_glasses: dbData?.demographicsDetails?.wear_glasses,
    has_children: dbData?.demographicsDetails?.has_children,
    has_legal_history: dbData?.demographicsDetails?.has_legal_history,
    scars_marks_tattoos: dbData?.demographicsDetails?.scars_marks_tattoos,
    weight: dbData?.demographicsDetails?.weight,
    race_ethnicity: dbData?.demographicsDetails?.race_ethnicity,
    language: dbData?.demographicsDetails?.language,
    height: dbData?.demographicsDetails?.height,
})

const Profile = forwardRef(({ currentTab }, ref) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const loadingBarRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const studentDetail = useSelector(state => state.student.studentInfo.demographicsTab.userProfileData);
    const selectedGuardian = useSelector(state => state.student.studentInfo.demographicsTab.selectedGuardian);
    const selectedMentor = useSelector(state => state.student.studentInfo.demographicsTab.selectedMentor)

    const [visibleSection, setVisibleSection] = useState("default");

    const [profileDbData, setProfileDbData] = useState(null);
    const [profileFormData, setProfileFormData] = useState(null);
    const [profileChanges, setProfileChanges] = useState(0);

    const [guardianDbData, setGuardianDbData] = useState(initialGuardianData);
    const [guardianFormData, setGuardianFormData] = useState(initialGuardianData);
    const [guardianChanges, setGuardianChanges] = useState(0);

    const [mentorsDbData, setmentorsDbData] = useState(initialMentorsData)
    const [mentorsFormData, setmentorsFormData] = useState(initialMentorsData)
    const [mentorsChanges, setmentorsChanges] = useState(0)

    const [demographicDbData, setdemographicDbData] = useState(intialDemographicsData)
    const [demographicFormData, setdemographicFormData] = useState(intialDemographicsData)
    const [demographicChanges, setdemographicChanges] = useState(0)



    const handleFieldChange = (fieldPath, value) => {
        setProfileFormData(prev => {
            const newValues = { ...prev };
            const pathParts = fieldPath.split('.');

            if (pathParts.length === 2) {
                newValues[pathParts[0]] = {
                    ...newValues[pathParts[0]],
                    [pathParts[1]]: value
                };
            } else {
                newValues[fieldPath] = value;
            }

            return newValues;
        });
    };

    const handleDemographicsChange = (field, value) => {
        setdemographicFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleGuardianFormChange = (values) => {
        setGuardianFormData(values);
    };

    const handleMentorsFormChange = (values) => {
        setmentorsFormData(values)
    }

    const saveChanges = async () => {
        if (!id) return;

        loadingBarRef.current?.continuousStart();
        try {
            if (profileChanges > 0) {
                const profilePayload = {
                    data: profileFormData,
                    studentId: id
                };
                await dispatch(updateUserProfileTab(profilePayload)).unwrap();
                setProfileChanges(0);
            }

            if (demographicChanges > 0) {
                const demographicPayload = {
                    data: demographicFormData,
                    studentId: id
                }
                if (studentDetail.demographicsDetails === null) {
                    await dispatch(addStudentDemographicsThunk(demographicPayload)).unwrap();
                } else {
                    await dispatch(updateStudentDemographicsThunk(demographicPayload)).unwrap();
                }
                setdemographicChanges(0);
            }

            if (visibleSection === "guardianForm" && guardianChanges > 0) {
                if (selectedGuardian?._id) {
                    await dispatch(updateGuardianThunk({
                        data: guardianFormData,
                        studentId: id,
                        guardianId: selectedGuardian._id
                    })).unwrap();
                } else {
                    const guardianPayload = {
                        data: guardianFormData,
                        studentId: id
                    };
                    await dispatch(addGuardianThunk(guardianPayload)).unwrap();
                }
                setGuardianChanges(0);
                setVisibleSection("default");
            }

            if (visibleSection === 'mentorsForm' && mentorsChanges > 0) {
                const mentorPayload = {
                    data: mentorsFormData,
                    studentId: id
                };
                if (selectedMentor?._id) {
                    await dispatch(updateMentorThunk({
                        data: mentorsFormData,
                        studentId: id,
                        mentorId: selectedMentor?._id
                    })).unwrap()
                } else {
                    await dispatch(addMentorsThunk(mentorPayload)).unwrap();
                }
                setmentorsChanges(0);
                setVisibleSection("default");
            }

            await dispatch(getStudentDetailThunk(id)).unwrap();
            dispatch(setChanges(0));

        } catch (err) {
            console.error('Failed in saveChanges:', err);
        } finally {
            loadingBarRef.current?.complete();
        }
    };

    const resetForm = () => {
        if (studentDetail) {
            const initialData = getInitialProfileData(studentDetail);
            setProfileDbData(initialData);
            setProfileFormData(initialData);
            setProfileChanges(0);
        }
        if (visibleSection === "guardianForm") {
            setGuardianFormData(initialGuardianData);
            setGuardianDbData(initialGuardianData);
            setGuardianChanges(0);
            setVisibleSection("default");
        }
    };

    useImperativeHandle(ref, () => ({
        hasChanges: () => profileChanges > 0 || guardianChanges > 0,
        saveChanges,
        resetForm
    }));

    const handleAddGuardian = () => {
        setVisibleSection("guardianForm");
        setGuardianFormData(initialGuardianData);
        setGuardianDbData(initialGuardianData);
        setGuardianChanges(0);
    };

    const handleEditGuardian = () => {
        if (selectedGuardian) {
            setVisibleSection("guardianForm");
            const formattedGuardianData = {
                guardian: {
                    first_name: selectedGuardian.guardian?.first_name || "",
                    last_name: selectedGuardian.guardian?.last_name || "",
                    email: selectedGuardian.guardian?.email || "",
                    phone: selectedGuardian.guardian?.phone || "",
                    address: selectedGuardian.guardian?.address || "",
                    city: selectedGuardian.guardian?.city || "",
                    state: selectedGuardian.guardian?.state || "",
                    zip_code: selectedGuardian.guardian?.zip_code || "",
                    household_income: selectedGuardian.guardian?.household_income || "",
                    snap_benifits: selectedGuardian.guardian?.snap_benifits || false,
                },
                relationship: selectedGuardian.relationship || "",
                legal_rights: selectedGuardian.legal_rights || false,
                emergency_contact: selectedGuardian.emergency_contact || false,
                autorized_pickup: selectedGuardian.autorized_pickup || false,
                receives_mail: selectedGuardian.receives_mail || false,
                custody: selectedGuardian.custody || false,
            };
            setGuardianFormData(formattedGuardianData);
            setGuardianDbData(formattedGuardianData);
            setGuardianChanges(0);
        }
    };

    const handleEditMentor = () => {
        if (selectedMentor) {
            setVisibleSection("mentorsForm")
            const formattedMentorsData = {
                first_name: selectedMentor?.first_name,
                last_name: selectedMentor?.last_name,
                email: selectedMentor?.email,
                phone: selectedMentor?.phone,
                relationship: selectedMentor?.relationship,
                address: selectedMentor?.address,
                city: selectedMentor?.city,
                state: selectedMentor?.state,
                zip_code: selectedMentor?.zip_code,
                referral_source: selectedMentor?.referral_source,
                proximity: selectedMentor?.proximity,
                expertise: selectedMentor?.expertise,
                marital_status: selectedMentor?.marital_status,
                work_status: selectedMentor?.work_status,
                status: selectedMentor?.status,
                type: selectedMentor?.type,
                screened_date: selectedMentor?.screened_date,
                employer: selectedMentor?.employer,
                background_checked: selectedMentor?.background_checked,
                trained: selectedMentor?.trained,
                matched: selectedMentor?.matched,
                status_notes: selectedMentor?.status_notes,
            }
            setmentorsFormData(formattedMentorsData)
            setmentorsDbData(formattedMentorsData)
            setmentorsChanges(0)
        }
    }

    const handleCancelGuardian = () => {
        setVisibleSection("default");
        setGuardianFormData(initialGuardianData);
        setGuardianDbData(initialGuardianData);
        setGuardianChanges(0);
    };

    const handleCancelMentor = () => {
        setVisibleSection("default");
        setmentorsFormData(initialMentorsData);
        setmentorsDbData(initialMentorsData);
        setmentorsChanges(0);
    }

    const handleAddMentor = () => {
        setVisibleSection("mentorsForm")
        setmentorsFormData(initialMentorsData)
        setmentorsDbData(initialMentorsData)
        setmentorsChanges(0)
    }
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    loadingBarRef.current?.continuousStart();
                    setIsLoading(true);
                    await dispatch(getStudentDetailThunk(id)).unwrap();
                } catch (error) {
                    console.error('Error fetching student details:', error);
                } finally {
                    loadingBarRef.current?.complete();
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, [id, dispatch]);

    useEffect(() => {
        if (studentDetail) {
            const initialData = getInitialProfileData(studentDetail);
            setProfileDbData(initialData);
            setProfileFormData(initialData);
        }
    }, [studentDetail, currentTab]);

    useEffect(() => {
        if (studentDetail) {
            const initialData = intialDemographicsData(studentDetail)
            setdemographicDbData(initialData)
            setdemographicFormData(initialData)
        }
    }, [studentDetail, currentTab])

    useEffect(() => {
        if (profileDbData && profileFormData) {
            const changes = countDifferences(profileDbData, profileFormData);
            setProfileChanges(changes);

            const totalChanges = changes + guardianChanges;
            dispatch(setChanges(totalChanges));
        }
    }, [profileFormData, profileDbData]);

    useEffect(() => {
        if (guardianDbData && guardianFormData) {
            const changes = countDifferences(guardianDbData, guardianFormData);
            setGuardianChanges(changes);

            const totalChanges = changes + profileChanges;
            dispatch(setChanges(totalChanges));
        }
    }, [guardianFormData, guardianDbData]);

    useEffect(() => {
        if (mentorsDbData && mentorsFormData) {
            const changes = countDifferences(mentorsDbData, mentorsFormData);

            if (changes !== mentorsChanges) {
                setmentorsChanges(changes);
                dispatch(setChanges(changes));
            }
        }
    }, [mentorsFormData, mentorsDbData]);

    useEffect(() => {
        if (demographicDbData && demographicFormData) {
            const changes = countDifferences(demographicDbData, demographicFormData)

            if (changes !== demographicChanges) {
                setdemographicChanges(changes)
                dispatch(setChanges(changes))
            }
        }
    }, [demographicDbData, demographicFormData])

    useEffect(() => {
        if (selectedGuardian) {
            handleEditGuardian();
        }
    }, [selectedGuardian]);

    useEffect(() => {
        if (selectedMentor) {
            handleEditMentor()
        }
    }, [selectedMentor])

    useEffect(() => {
        setVisibleSection("default")
    }, [id])

    const UserProfileSkeleton = () => (
        <div className="w-1/2 p-6 bg-white rounded-xl shadow-sm animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const DemographicsSkeleton = () => (
        <div className="w-1/2 p-6 bg-white rounded-xl shadow-sm animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-5 w-36 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-28 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-5 w-28 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const TableSkeleton = () => (
        <div className="w-full mt-6 p-6 bg-white rounded-xl shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                <div className="h-9 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="h-12 bg-gray-100 flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex-1 px-6 py-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
                {[1, 2, 3].map((row) => (
                    <div key={row} className="h-16 border-t border-gray-200 flex items-center">
                        {[1, 2, 3, 4, 5].map((col) => (
                            <div key={col} className="flex-1 px-6">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <LoadingBar color="#ef4444" ref={loadingBarRef} />

            {visibleSection === "default" && (
                <>
                    <div className='flex justify-between'>
                        {isLoading ? (
                            <>
                                <UserProfileSkeleton />
                                <DemographicsSkeleton />
                            </>
                        ) : (
                            <>
                                <UserProfile
                                    values={profileFormData}
                                    onChange={handleFieldChange}
                                    onSubmit={(e) => e.preventDefault()}
                                    changedFieldsCount={profileChanges}
                                />
                                <Demographics
                                    values={demographicFormData}
                                    onChange={handleDemographicsChange}
                                    onSubmit={(e) => e.preventDefault()}
                                    changedFieldsCount={demographicChanges}
                                />
                            </>
                        )}
                    </div>
                    {isLoading ? (
                        <>
                            <TableSkeleton />
                            <TableSkeleton />
                        </>
                    ) : (
                        <>
                            <GuardianTable onAddGuardian={handleAddGuardian} />
                            <MentorsTable onAddMentor={handleAddMentor} />
                        </>
                    )}
                </>
            )}

            {visibleSection === "guardianForm" && (
                <GuardianForm
                    values={guardianFormData}
                    onChange={handleGuardianFormChange}
                    onCancel={handleCancelGuardian}
                />
            )}
            {visibleSection === "mentorsForm" && (
                <MentorsForm
                    values={mentorsFormData}
                    onChange={handleMentorsFormChange}
                    onCancel={handleCancelMentor}
                />
            )}
        </div>
    );
});

export default Profile;
