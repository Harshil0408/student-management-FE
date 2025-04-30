import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '../../../components/ui/button';
import { AddIconSvg, EditSvg } from '../../../assets/svg/Svg';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { APPLICATION_STATUS, APPLICATION_STATUS_REASONS } from '../../../utils/fixedData';
import { addApplicationStatusThunk, deleteApplicationStatus, getApplicationStatusThunk, updateApplicationStatus } from '../../../store/thunks/studentThunk';
import { useParams } from 'react-router-dom';
import { selectApplicationData } from '../../../store/slices/studentSlice';

const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
    reason: Yup.string().required("Reason is required"),
});

const ApplicationStatusTable = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isEditMode, setisEditMode] = useState(false);
    const { isLoading } = useSelector(state => state.student);
    const { applicationData, selectedApplication } = useSelector(state => state.student.studentInfo.enrollmentTab);
    const [statusId, setstatusId] = useState(null)

    const formik = useFormik({
        initialValues: {
            status: "",
            reason: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (isEditMode) {
                    await dispatch(updateApplicationStatus({ studentId: id, data: values, applicationStatusId: statusId })).unwrap().then(() => {
                        dispatch(getApplicationStatusThunk({ studentId: id }))
                    })
                } else {
                    await dispatch(addApplicationStatusThunk({ studentId: id, data: values })).unwrap();
                }
            } catch (error) {
                console.log('error', error);
            }
            setOpen(false);
            resetForm();
            setisEditMode(false);
        },
    });

    const handleDeleteApplication = async (applicationStatusId) => {
        try {
            await dispatch(deleteApplicationStatus({ applicationStatusId })).unwrap().then(() => {
                dispatch(getApplicationStatusThunk({ studentId: id }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isEditMode && open && selectedApplication) {
            formik.setValues({
                status: selectedApplication.status || "",
                reason: selectedApplication.reason || "",
            });
        } else if (!isEditMode && open) {
            formik.resetForm();
        }
    }, [isEditMode, open, selectedApplication]);

    const handleEditApplicationStatus = (data) => {
        dispatch(selectApplicationData(data));
        setisEditMode(true);
        setOpen(true);
        setstatusId(data._id)
    };

    return (
        <div>
            <Card className='card-lg p-6 my-6 rounded-xl bg-white'>
                <div className='flex justify-between'>
                    <div className='mb-6'>
                        <h1 className='text-2xl font-bold text-gray-800'>Application Status</h1>
                        <p className='text-zinc-400'>Review and manage student's application status.</p>
                    </div>
                    <div>
                        <Button
                            variant="outline"
                            className="gap-1 cursor-pointer shadow-sm hover:bg-blue-100 transition"
                            onClick={() => {
                                setisEditMode(false);
                                setOpen(true);
                            }}
                        >
                            <AddIconSvg />
                            Add
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) setisEditMode(false);
                }}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Application Status" : "Add Application Status"}</DialogTitle>
                            <DialogDescription>
                                {isEditMode ? "Update the status details below." : "Add application status details below."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="status" className="text-right ml-8">
                                            Status
                                        </Label>
                                        <div className="col-span-3 space-y-1">
                                            <Select
                                                value={formik.values.status}
                                                onValueChange={value => formik.setFieldValue("status", value)}
                                            >
                                                <SelectTrigger className="w-full" id="status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(APPLICATION_STATUS).map(([code, label]) => (
                                                        <SelectItem key={code} value={code}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {formik.touched.status && formik.errors.status && (
                                                <p className="text-xs text-red-500">{formik.errors.status}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="reason" className="text-right ml-8">
                                            Reason
                                        </Label>
                                        <div className="col-span-3 space-y-1">
                                            <Select
                                                value={formik.values.reason}
                                                onValueChange={value => formik.setFieldValue("reason", value)}
                                            >
                                                <SelectTrigger className="w-full" id="reason">
                                                    <SelectValue placeholder="Select reason" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(APPLICATION_STATUS_REASONS).map(([key, value]) => (
                                                        <SelectItem key={key} value={key}>
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {formik.touched.reason && formik.errors.reason && (
                                                <p className="text-xs text-red-500">{formik.errors.reason}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className='cursor-pointer bg-red-600 hover:bg-red-600' type="submit" disabled={isLoading}>
                                    Save Status
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className='overflow-auto rounded-md border border-gray-200 mt-4'>
                    <Table className='w-full text-sm text-left text-gray-700'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='px-6 py-4'>Date</TableHead>
                                <TableHead className='px-6 py-4'>Reason</TableHead>
                                <TableHead className='px-6 py-4'>Status</TableHead>
                                <TableHead className='px-6 py-4'>Staff Member</TableHead>
                                <TableHead className='px-6 py-4'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicationData && applicationData.length > 0 ? (
                                applicationData.map((applicationStatus, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='px-6 py-4'>{applicationStatus?.timestamps ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{APPLICATION_STATUS_REASONS[applicationStatus?.reason] ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{APPLICATION_STATUS[applicationStatus?.status] ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{applicationStatus?.staff_member ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div className='cursor-pointer'>
                                                        <EditSvg />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => handleEditApplicationStatus(applicationStatus)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteApplication(applicationStatus._id)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='text-center py-6 text-gray-400'>
                                        No application status found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default ApplicationStatusTable;
