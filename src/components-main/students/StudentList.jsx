import React, { useEffect, useState } from 'react'
import {
    Tabs, TabsList, TabsTrigger, TabsContent
} from "@/components/ui/tabs"
import {
    Button
} from "@/components/ui/Button"
import { AddIconSvg, EditStudentSvg } from '../../assets/svg/Svg'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { emailRegex } from '../../utils/regex/regex'
import { useDispatch, useSelector } from 'react-redux'
import { addStudentThunk, getStudentListThunk } from '../../store/thunks/studentThunk'
import { toast } from 'sonner'
import { Card } from "@/components/ui/card"
import { ROUTER } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import { GENDER } from '../../utils/fixedData'



const formSchema = {
    first_name: '',
    last_name: '',
    email: ''
}

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().matches(emailRegex, "Invalid email").required("Email is required")
})

const StudentList = () => {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const { studentList, currentPage, totalPages, isLoading } = useSelector(state => state.student);
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: formSchema,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                dispatch(addStudentThunk(values))
                    .unwrap()
                    .then(() => {
                        toast.success('Student created successfully', {
                            duration: 3000,
                        });
                        dispatch(getStudentListThunk()).unwrap()
                        setIsOpen(false)
                        formik.resetForm()
                    }).catch((error) => {
                        toast.success(error?.message, {
                            duration: 3000,
                        });
                    })

            } catch (error) {
                toast.success(error?.message, {
                    duration: 3000,
                });
            }
        }
    })

    const { values, errors, touched, handleSubmit, handleBlur, handleChange } = formik

    useEffect(() => {
        try {
            dispatch(getStudentListThunk({ page })).unwrap()
        } catch  {
            toast.error('Something went wrong. Please try again.', {
                duration: 3000,
            });
        }
    }, [dispatch, page])

    return (
        <div>

            <div className='flex justify-between'>
                <div>

                    <Tabs defaultValue="all" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger defaultValue value="all" className="text-gray-600 cursor-pointer px-3">All</TabsTrigger>
                            <TabsTrigger value="active" className="text-gray-600 cursor-pointer px-3">Active</TabsTrigger>
                            <TabsTrigger value="inactive" className="text-gray-600 cursor-pointer px-3">Inactive</TabsTrigger>
                            <TabsTrigger value="flagged" className="text-gray-600 cursor-pointer px-3">Flagged</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div>
                    <div >
                        <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className='inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input text-zinc-900 shadow-sm bg-accent rounded-md px-3 h-7 gap-1 text-sm hover:bg-accent cursor-pointer'>
                                    <span><AddIconSvg /></span>
                                    Add
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                    <DialogTitle>Add Student Details</DialogTitle>
                                    <DialogDescription>
                                        Add student details below. Click save when you're finished.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="first_name" className="text-right ml-8">
                                                First name
                                            </Label>
                                            <div className="col-span-3 space-y-1">
                                                <Input
                                                    id="first_name"
                                                    name="first_name"
                                                    value={values.first_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="First Name"
                                                    className={`${errors.first_name && touched.first_name ? 'border-red-500' : ''}`}
                                                />
                                                {errors.first_name && touched.first_name &&
                                                    <p className='text-red-500 text-xs'>{errors.first_name}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="last_name" className="text-right ml-8">
                                                Last name
                                            </Label>
                                            <div className="col-span-3 space-y-1">
                                                <Input
                                                    id="last_name"
                                                    name="last_name"
                                                    value={values.last_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Last Name"
                                                    className={`${errors.last_name && touched.last_name ? 'border-red-500' : ''}`}
                                                />
                                                {errors.last_name && touched.last_name &&
                                                    <p className='text-red-500 text-xs'>{errors.last_name}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right ml-8">
                                                Email
                                            </Label>
                                            <div className="col-span-3 space-y-1">
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Email"
                                                    className={`${errors.email && touched.email ? 'border-red-500' : ''}`}
                                                />
                                                {errors.email && touched.email &&
                                                    <p className='text-red-500 text-xs'>{errors.email}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className='bg-red-500 hover:bg-red-600 cursor-pointer' disabled={isLoading} onClick={handleSubmit}>Add Student</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <Card className='card shadow-lg p-6 my-6 rounded-xl bg-white'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>Students</h1>
                    <p className='text-zinc-400'>List of all students</p>
                </div>
                <div className='overflow-auto rounded-md border border-gray-200'>
                    <Table className='w-full text-sm text-left text-gray-700'>
                        <TableHeader>
                            <TableRow className='bg-gray-100 text-gray-600'>
                                <TableHead className='px-6 py-4'>Student Name</TableHead>
                                <TableHead className='px-6 py-4'>Email</TableHead>
                                <TableHead className='px-6 py-4'>Status</TableHead>
                                <TableHead className='px-6 py-4'>Age</TableHead>
                                <TableHead className='px-6 py-4'>Gender</TableHead>
                                <TableHead className='px-6 py-4'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {studentList?.length > 0 ? (
                                studentList.map((student, index) => (
                                    <TableRow
                                        key={index}
                                        className='border-b border-gray-200 hover:bg-gray-50 transition-all'
                                    >
                                        <TableCell className='px-6 py-4 font-medium text-gray-900'>
                                            {student?.user_info.first_name} {student?.user_info?.last_name}
                                        </TableCell>
                                        <TableCell className='px-6 py-4'>{student?.user_info?.email}</TableCell>
                                        <TableCell className='px-6 py-4'>
                                            <span className='px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600'>
                                                {student?.enrollment_status ?? '—'}
                                            </span>
                                        </TableCell>
                                        <TableCell className='px-6 py-4'>{student?.date_of_birth ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>
                                            {GENDER[student?.gender] ?? '—'}
                                        </TableCell>
                                        <TableCell className='px-6 py-4'>
                                            <Card onClick={() => navigate(`${ROUTER.students}/${student?.user}`)} className='flex items-center justify-center w-10 h-10 p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg shadow-sm'>
                                                <EditStudentSvg className='w-5 h-5 text-gray-700' />
                                            </Card>
                                        </TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='px-6 py-6 text-center text-gray-400'>
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg text-sm shadow-sm disabled:opacity-50"
                    >
                        Prev
                    </Button>

                    <span className="text-sm text-zinc-600 font-medium">
                        Page <span className="text-zinc-900 font-semibold">{currentPage}</span> of <span className="text-zinc-900 font-semibold">{totalPages}</span>
                    </span>

                    <Button
                        variant="outline"
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg text-sm shadow-sm disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>
            </Card>


        </div>
    )
}

export default StudentList