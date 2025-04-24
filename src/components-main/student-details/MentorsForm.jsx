import React, { useEffect, useImperativeHandle, forwardRef } from 'react'
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Label } from '@radix-ui/react-label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from '../../components/ui/input'
import { INDIAN_STATE } from '../../utils/fixedData'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const validationSchema = Yup.object({
    first_name: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    last_name: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    relationship: Yup.string()
        .required("Relationship is required"),
    address: Yup.string()
        .required("Address is required")
        .min(5, "Address must be at least 5 characters"),
    city: Yup.string()
        .required("City is required"),
    state: Yup.string()
        .required("State is required"),
    zip_code: Yup.string()
        .required("Zip code is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits"),
    referral_source: Yup.string()
        .required("Referral source is required"),
    proximity: Yup.string()
        .required("Proximity is required"),
    expertise: Yup.string()
        .required("Expertise is required"),
    marital_status: Yup.string()
        .required("Marital status is required"),
    work_status: Yup.string()
        .required("Work status is required"),
    status: Yup.string()
        .required("Status is required"),
    type: Yup.string()
        .required("Type is required"),
    screened_date: Yup.string()
        .required("Screened date is required"),
    employer: Yup.string()
        .required("Employer is required"),
    status_notes: Yup.string()
        .required("Status notes is required"),
})

const MentorsForm = forwardRef(({ values, onChange, onCancel }, ref) => {
    const formik = useFormik({
        initialValues: values,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    })

    const validateForm = async () => {
        const errors = await formik.validateForm();
        Object.keys(formik.values).forEach(key => {
            formik.setFieldTouched(key, true);
        });
        return Object.keys(errors).length === 0;
    };

    useImperativeHandle(ref, () => ({
        saveChanges: async () => {
            const isValid = await validateForm();
            if (isValid) {
                return true;
            }
            return false;
        },
        validateForm
    }));

    useEffect(() => {
        onChange(formik.values)
    }, [formik.values, onChange])

    const { errors, touched, handleBlur, handleChange, setFieldValue } = formik

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Card className="px-2 py-6">
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>Add Mentor</CardTitle>
                    <CardDescription>Update and manage the Mentor's information</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className='grid grid-cols-3 gap-5'>
                        {/* Personal Information */}
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter first name"
                            />
                            {touched.first_name && errors.first_name && (
                                <p className="text-red-500 text-sm">{errors.first_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter last name"
                            />
                            {touched.last_name && errors.last_name && (
                                <p className="text-red-500 text-sm">{errors.last_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter email"
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                value={formik.values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter phone number"
                            />
                            {touched.phone && errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Relationship</Label>
                            <Input
                                name="relationship"
                                value={formik.values.relationship}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter relationship"
                            />
                            {touched.relationship && errors.relationship && (
                                <p className="text-red-500 text-sm">{errors.relationship}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input
                                name="address"
                                value={formik.values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter address"
                            />
                            {touched.address && errors.address && (
                                <p className="text-red-500 text-sm">{errors.address}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                                name="city"
                                value={formik.values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter city"
                            />
                            {touched.city && errors.city && (
                                <p className="text-red-500 text-sm">{errors.city}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>State</Label>
                            <Select
                                value={formik.values.state}
                                onValueChange={(value) => setFieldValue('state', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(INDIAN_STATE).map(([code, label]) => (
                                        <SelectItem key={code} value={code}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {touched.state && errors.state && (
                                <p className="text-red-500 text-sm">{errors.state}</p>
                            )}
                        </div>

                        {[
                            { name: "zip_code", label: "Zip Code", placeholder: "Enter zip code" },
                            { name: "referral_source", label: "Referral Source", placeholder: "Enter referral source" },
                            { name: "proximity", label: "Proximity", placeholder: "Enter proximity" },
                            { name: "expertise", label: "Expertise", placeholder: "Enter expertise" },
                            { name: "marital_status", label: "Marital Status", placeholder: "Enter marital status" },
                            { name: "work_status", label: "Work Status", placeholder: "Enter work status" },
                            { name: "status", label: "Status", placeholder: "Enter status" },
                            { name: "type", label: "Type", placeholder: "Enter type" },
                            { name: "screened_date", label: "Screened Date", placeholder: "Enter screened date", type: "date" },
                            { name: "employer", label: "Employer", placeholder: "Enter employer" },
                            { name: "status_notes", label: "Status Notes", placeholder: "Enter status notes" },
                        ].map((field) => (
                            <div key={field.name} className="space-y-2">
                                <Label>{field.label}</Label>
                                <Input
                                    type={field.type || "text"}
                                    name={field.name}
                                    value={formik.values[field.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={field.placeholder}
                                />
                                {touched[field.name] && errors[field.name] && (
                                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-5 mt-4">
                        {[
                            { name: "background_checked", label: "Background Checked" },
                            { name: "trained", label: "Trained" },
                            { name: "matched", label: "Matched" },
                        ].map((field) => (
                            <div key={field.name} className="flex items-center justify-between border p-2 rounded-lg">
                                <Label>{field.label}</Label>
                                <Switch
                                    checked={formik.values[field.name]}
                                    onCheckedChange={(checked) => setFieldValue(field.name, checked)}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>

                <div className="px-6 py-4 flex gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </Card>
        </form>
    )
})

export default MentorsForm