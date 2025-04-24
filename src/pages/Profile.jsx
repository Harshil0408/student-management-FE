import React, { useEffect, useImperativeHandle, useState, forwardRef } from 'react';
import UserProfile from '../components-main/student-details/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setChanges } from '../store/slices/studentSlice';
import { updateUserProfileTab, addGuardianThunk, getStudentDetailThunk, addMentorsThunk } from '../store/thunks/studentThunk';
import { useParams } from 'react-router-dom';
import Demographics from '../components-main/student-details/Demographics';
import GuardianTable from '../components-main/student-details/GuardianTable';
import GuardianForm from '../components-main/student-details/GuardianForm';
import MentorsTable from '../components-main/student-details/MentorsTable';
import MentorsForm from '../components-main/student-details/MentorsForm';

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

const Profile = forwardRef(({ currentTab }, ref) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const studentDetail = useSelector(state => state.student.studentInfo.demographicsTab.userProfileData);

    const [visibleSection, setVisibleSection] = useState("default");

    const [profileDbData, setProfileDbData] = useState(null);
    const [profileFormData, setProfileFormData] = useState(null);
    const [profileChanges, setProfileChanges] = useState(0);

    console.log('profileDbData', profileDbData)
    console.log('profileFormData', profileFormData)


    const [guardianDbData, setGuardianDbData] = useState(initialGuardianData);
    const [guardianFormData, setGuardianFormData] = useState(initialGuardianData);
    const [guardianChanges, setGuardianChanges] = useState(0);

    const [mentorsDbData, setmentorsDbData] = useState(initialMentorsData)
    const [mentorsFormData, setmentorsFormData] = useState(initialMentorsData)
    const [mentorsChanges, setmentorsChanges] = useState(0)


    useEffect(() => {
        if (studentDetail) {
            console.log('Reinitializing form data with:', studentDetail);
            const initialData = getInitialProfileData(studentDetail);
            setProfileDbData(initialData);
            setProfileFormData(initialData);
        }
    }, [studentDetail, currentTab]);

    useEffect(() => {
        console.log('Current profile form data:', profileFormData);
    }, [profileFormData]);

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
            console.log('Calculating mentor changes...');
            console.log('Previous changes:', mentorsChanges);
            console.log('New changes:', changes);

            if (changes !== mentorsChanges) {
                setmentorsChanges(changes);
                dispatch(setChanges(changes));
            }
        }
    }, [mentorsFormData, mentorsDbData]);

    const handleFieldChange = (fieldPath, value) => {
        console.log(`Updating field ${fieldPath} with value:`, value); // Debug log
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

            console.log('New form data:', newValues); // Debug log
            return newValues;
        });
    };

    const handleGuardianFormChange = (values) => {
        setGuardianFormData(values);
    };

    const handleMentorsFormChange = (values) => {
        setmentorsFormData(values)
    }

    const saveChanges = async () => {
        if (!id) return;


        try {
            if (visibleSection === "default" && profileChanges > 0) {
                const payload = {
                    data: profileFormData,
                    studentId: id
                };
                await dispatch(updateUserProfileTab(payload)).unwrap();
                await dispatch(getStudentDetailThunk(id)).unwrap();
                setProfileChanges(0);
            }
            else if (visibleSection === "guardianForm" && guardianChanges > 0) {
                const payload = {
                    data: guardianFormData,
                    studentId: id
                };
                await dispatch(addGuardianThunk(payload)).unwrap();
                await dispatch(getStudentDetailThunk(id)).unwrap();
                setGuardianChanges(0);
                setVisibleSection("default");
            }
            else if (visibleSection === 'mentorsForm' && mentorsChanges > 0) {
                const payload = {
                    data: mentorsFormData,
                    studentId: id
                };

                try {
                    await dispatch(addMentorsThunk(payload)).unwrap();

                    await dispatch(getStudentDetailThunk(id)).unwrap();

                    setmentorsFormData(initialMentorsData);
                    setmentorsDbData(initialMentorsData);
                    setmentorsChanges(0);
                    setVisibleSection("default");
                    dispatch(setChanges(0));
                } catch (addError) {
                    console.error('Error in addMentorsThunk:', addError);
                }
            }
        } catch (err) {
            console.error('Failed in saveChanges:', err);
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

    const handleCancelGuardian = () => {
        setVisibleSection("default");
        setGuardianFormData(initialGuardianData);
        setGuardianDbData(initialGuardianData);
        setGuardianChanges(0);
    };

    const handleAddMentor = () => {
        setVisibleSection("mentorsForm")
        setmentorsFormData(initialMentorsData)
        setmentorsDbData(initialMentorsData)
        setmentorsChanges(0)
    }

    return (
        <div>
            {visibleSection === "default" && (
                <>
                    <div className='flex justify-between'>
                        <UserProfile
                            values={profileFormData}
                            onChange={handleFieldChange}
                            onSubmit={(e) => e.preventDefault()}
                            changedFieldsCount={profileChanges}
                        />
                        <Demographics />
                    </div>
                    <GuardianTable onAddGuardian={handleAddGuardian} />
                    <MentorsTable onAddMentor={handleAddMentor} />
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
                    onCancel={() => {
                        setVisibleSection("default");
                        setmentorsFormData(initialMentorsData);
                        setmentorsDbData(initialMentorsData);
                        setmentorsChanges(0);
                    }}
                />
            )}
        </div>
    );
});

export default Profile;
