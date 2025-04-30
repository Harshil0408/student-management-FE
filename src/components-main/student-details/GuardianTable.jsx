import React from 'react';
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
import { AddIconSvg, EditSvg } from '../../assets/svg/Svg';
import { Button } from '../../components/ui/button';
import { useParams } from 'react-router-dom';
import { deleteSingleGuardianThunk, getSingleGuardiansThunk, getStudentDetailThunk } from '../../store/thunks/studentThunk';

const GuardianTable = ({ onAddGuardian }) => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const { userGuardian } = useSelector(state => state.student.studentInfo.demographicsTab);

    const getGuaridianData = async (guardianId) => {
        try {
            await dispatch(getSingleGuardiansThunk({ studentId: id, guardianId })).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }

    const deleteGuardian = async (guardianId) => {
        try {
            await dispatch(deleteSingleGuardianThunk({ studentId: id, guardianId })).unwrap().then(() => {
                dispatch(getStudentDetailThunk(id))
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div>
            <Card className='card-lg p-6 my-6 rounded-xl bg-white'>
                <div className='flex justify-between'>
                    <div className='mb-6'>
                        <h1 className='text-2xl font-bold text-gray-800'>Guardians</h1>
                        <p className='text-zinc-400'>Update and manage student's guardians.</p>
                    </div>
                    <div>
                        <Button onClick={onAddGuardian} variant="outline" className='gap-1 cursor-pointer'>
                            <AddIconSvg />
                            Add
                        </Button>
                    </div>
                </div>
                <div className='overflow-auto rounded-md border border-gray-200'>
                    <Table className='w-full text-sm text-left text-gray-700'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='px-6 py-4'>Name</TableHead>
                                <TableHead className='px-6 py-4'>Email</TableHead>
                                <TableHead className='px-6 py-4'>Phone</TableHead>
                                <TableHead className='px-6 py-4'>Relationship</TableHead>
                                <TableHead className='px-6 py-4'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userGuardian && userGuardian.length > 0 ? (
                                userGuardian.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='px-6 py-4'>{student?.guardian?.first_name ?? '—'} {student?.guardian?.last_name}</TableCell>
                                        <TableCell className='px-6 py-4'>{student?.guardian?.email ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{student?.guardian?.phone ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>{student?.relationship ?? '—'}</TableCell>
                                        <TableCell className='px-6 py-4'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div className='cursor-pointer'>
                                                        <EditSvg />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => getGuaridianData(student._id)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => deleteGuardian(student._id)}>Delete</DropdownMenuItem>
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
    );
};

export default GuardianTable;
