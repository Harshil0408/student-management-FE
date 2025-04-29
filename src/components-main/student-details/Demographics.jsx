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

const validationSchema = Yup.object({
    hair_color: Yup.string().required('Hair color is required'),
    eye_color: Yup.string().required('Eye color is required'),
    weight: Yup.string(),
    height: Yup.string(),
    race_ethnicity: Yup.string().required('Race / Ethnicity is required'),
    language: Yup.string().required('Language is required'),
    scars_marks_tattoos: Yup.string(),
})

const Demographics = ({ values, onChange, onSubmit }) => {
    // Use Formik for validation and submission, but not for value state
    const formik = useFormik({
        initialValues: values,
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    // Helper to handle field changes and notify parent
    const handleFieldChange = (field, value) => {
        formik.setFieldValue(field, value);
        if (onChange) {
            onChange(field, value);
        }
    };

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
                                    value={values.hair_color}
                                    onValueChange={val => handleFieldChange('hair_color', val)}
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
                                    value={values.eye_color}
                                    onValueChange={val => handleFieldChange('eye_color', val)}
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
                            {/* Wear Contacts */}
                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Wear Contacts</Label>
                                <Switch
                                    checked={values.wear_contacts}
                                    onCheckedChange={checked => handleFieldChange('wear_contacts', checked)}
                                />
                            </div>
                            {/* Wear Glasses */}
                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Wear Glasses</Label>
                                <Switch
                                    checked={values.wear_glasses}
                                    onCheckedChange={checked => handleFieldChange('wear_glasses', checked)}
                                />
                            </div>
                            {/* Has Children */}
                            <div className="space-y-2 flex items-center">
                                <Label className='mr-3'>Has Children</Label>
                                <Switch
                                    checked={values.has_children}
                                    onCheckedChange={checked => handleFieldChange('has_children', checked)}
                                />
                            </div>
                            {/* Has Legal History */}
                            <div className="space-y-2 flex  items-center">
                                <Label className='mr-3'>Has Legal History</Label>
                                <Switch
                                    checked={values.has_legal_history}
                                    onCheckedChange={checked => handleFieldChange('has_legal_history', checked)}
                                />
                            </div>
                            {/* Scars, Marks, & Tattoos */}
                            <div className="space-y-2">
                                <Label>Scars, Marks, & Tattoos</Label>
                                <Input
                                    name="scars_marks_tattoos"
                                    value={values.scars_marks_tattoos}
                                    onChange={e => handleFieldChange('scars_marks_tattoos', e.target.value)}
                                    placeholder="Details"
                                />
                            </div>
                            {/* Weight */}
                            <div className="space-y-2">
                                <Label>Weight</Label>
                                <Input
                                    name="weight"
                                    value={values.weight}
                                    onChange={e => handleFieldChange('weight', e.target.value)}
                                    placeholder="Weight"
                                />
                            </div>
                            {/* Race / Ethnicity */}
                            <div className="space-y-2">
                                <Label>Race / Ethnicity</Label>
                                <Select
                                    value={values.race_ethnicity}
                                    onValueChange={val => handleFieldChange('race_ethnicity', val)}
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
                                    value={values.language}
                                    onValueChange={val => handleFieldChange('language', val)}
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
                                    value={values.height}
                                    onChange={e => handleFieldChange('height', e.target.value)}
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
