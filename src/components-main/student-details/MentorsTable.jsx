import React from 'react'
import { useSelector } from 'react-redux';
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
import { Button } from '../../components/ui/button';
import { AddIconSvg, EditSvg } from '../../assets/svg/Svg';


const MentorsTable = ({ onAddMentor }) => {

    const { userMentors } = useSelector(state => state.student.studentInfo.demographicsTab);

    return (
        <div>
            <div>
                <Card className='card-lg p-6 my-6 rounded-xl bg-white'>
                    <div className='flex justify-between'>
                        <div className='mb-6'>
                            <h1 className='text-2xl font-bold text-gray-800'>Mentors</h1>
                            <p className='text-zinc-400'>Update and manage student's mentors.</p>
                        </div>
                        <div>
                            <Button onClick={onAddMentor} variant="outline" className='gap-1 cursor-pointer'>
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
                                {userMentors && userMentors.length > 0 ? (
                                    userMentors.map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='px-6 py-4'>{student?.first_name ?? '—'} {student?.last_name}</TableCell>
                                            <TableCell className='px-6 py-4'>{student?.email ?? '—'}</TableCell>
                                            <TableCell className='px-6 py-4'>{student?.phone ?? '—'}</TableCell>
                                            <TableCell className='px-6 py-4'>{student?.relationship ?? '—'}</TableCell>
                                            <TableCell className='px-6 py-4'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <div className='cursor-pointer'>
                                                            <EditSvg />
                                                        </div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
        </div>
    )
}

export default MentorsTable