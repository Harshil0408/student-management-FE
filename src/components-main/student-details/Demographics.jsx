import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Label } from '@radix-ui/react-label'
import { Input } from '../../components/ui/input'
import { Switch } from '../../components/ui/switch'
import { HAIR_COLOR, EYE_COLOR, RACE_ETHERNITY, LANGUAGE } from '../../utils/fixedData'

const initialValues = {
    hair_color: '',
    eye_color: '',
    wear_contacts: false,
    wear_glasses: false,
    has_children: false,
    has_legal_history: false,
    scars_marks_tattoos: '',
    weight: '',
    race_ethnicity: '',
    language: '',
    height: '',
}

const validationSchema = Yup.object({
    hair_color: Yup.string().required('Hair color is required'),
    eye_color: Yup.string().required('Eye color is required'),
    weight: Yup.string(),
    height: Yup.string(),
    race_ethnicity: Yup.string().required('Race / Ethnicity is required'),
    language: Yup.string().required('Language is required'),
    scars_marks_tattoos: Yup.string(),
})

const Demographics = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <div className='w-[700px] overflow-x-hidden'>
            <form onSubmit={formik.handleSubmit}>
                <Card className="px-2 py-6">
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold'>Demographics</CardTitle>
                        <CardDescription>Update and manage user's demographics information.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">

                            {/* Hair Color */}
                            <div className="space-y-2">
                                <Label>Hair Color</Label>
                                <Select
                                    value={formik.values.hair_color}
                                    onValueChange={(value) => formik.setFieldValue('hair_color', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Hair Color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(HAIR_COLOR).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Eye Color */}
                            <div className="space-y-2">
                                <Label>Eye Color</Label>
                                <Select
                                    value={formik.values.eye_color}
                                    onValueChange={(value) => formik.setFieldValue('eye_color', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Eye Color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(EYE_COLOR).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Switches */}
                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Wear Contacts</Label>
                                <Switch
                                    checked={formik.values.wear_contacts}
                                    onCheckedChange={(checked) => formik.setFieldValue('wear_contacts', checked)}
                                />
                            </div>

                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Wear Glasses</Label>
                                <Switch
                                    checked={formik.values.wear_glasses}
                                    onCheckedChange={(checked) => formik.setFieldValue('wear_glasses', checked)}
                                />
                            </div>

                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Has Children</Label>
                                <Switch
                                    checked={formik.values.has_children}
                                    onCheckedChange={(checked) => formik.setFieldValue('has_children', checked)}
                                />
                            </div>

                            <div className="space-y-2 flex  items-center">
                                <Label className='mr-3'>Has Legal History</Label>
                                <Switch
                                    checked={formik.values.has_legal_history}
                                    onCheckedChange={(checked) => formik.setFieldValue('has_legal_history', checked)}
                                />
                            </div>

                            {/* Inputs */}
                            <div className="space-y-2">
                                <Label>Scars, Marks, & Tattoos</Label>
                                <Input
                                    name="scars_marks_tattoos"
                                    value={formik.values.scars_marks_tattoos}
                                    onChange={formik.handleChange}
                                    placeholder="Details"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Weight</Label>
                                <Input
                                    name="weight"
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                    placeholder="Weight"
                                />
                            </div>

                            {/* Race Ethnicity */}
                            <div className="space-y-2">
                                <Label>Race / Ethnicity</Label>
                                <Select
                                    value={formik.values.race_ethnicity}
                                    onValueChange={(value) => formik.setFieldValue('race_ethnicity', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Race / Ethnicity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(RACE_ETHERNITY).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Language */}
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select
                                    value={formik.values.language}
                                    onValueChange={(value) => formik.setFieldValue('language', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(LANGUAGE).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Height */}
                            <div className="space-y-2">
                                <Label>Height</Label>
                                <Input
                                    name="height"
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                    placeholder="Height"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default Demographics
