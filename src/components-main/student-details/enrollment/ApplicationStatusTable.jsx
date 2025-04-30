import React from 'react'
import { useSelector } from 'react-redux'
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
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { APPLICATION_STATUS, APPLICATION_STATUS_REASONS } from '../../../utils/fixedData'

const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
    reason: Yup.string().required("Reason is required"),
});

const ApplicationStatusTable = () => {

    const { applicationData } = useSelector(state => state.student.studentInfo.enrollmentTab)
    console.log('applicationData', applicationData)
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            status: "",
            reason: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            setOpen(false);
            resetForm();
        },
    });

    return (
        <div>
            <Card className='card-lg p-6 my-6 rounded-xl bg-white'>
                <div className='flex justify-between'>
                    <div className='mb-6'>
                        <h1 className='text-2xl font-bold text-gray-800'>Application Status</h1>
                        <p className='text-zinc-400'>Review and manage student's application status.</p>
                    </div>
                    <div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="gap-1 cursor-pointer shadow-sm hover:bg-blue-100 transition"
                                >
                                    <AddIconSvg />
                                    Add
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                    <DialogTitle>Add Application Status</DialogTitle>
                                    <DialogDescription>
                                        Add application status details below. Click save when you're finished.
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
                                        <Button type="submit">
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className='overflow-auto rounded-md border border-gray-200'>
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
                                        <TableCell className='px-6 py-4'>{applicationStatus?.reason ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{applicationStatus?.status ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{applicationStatus?.staff_member ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div className='cursor-pointer'>
                                                        <EditSvg />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem >Edit</DropdownMenuItem>
                                                    <DropdownMenuItem >Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='text-center py-6 text-gray-400'>
                                        No guardians found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default ApplicationStatusTable