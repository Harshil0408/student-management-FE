import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";

import { Label } from '@radix-ui/react-label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { INDIAN_STATE } from '../../utils/fixedData';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from '../../components/ui/switch';

const validationSchema = Yup.object().shape({
    guardian: Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip_code: Yup.string().required("Zip Code is required"),
        household_income: Yup.string(),
        snap_benifits: Yup.boolean(),
    }),
    legal_rights: Yup.boolean(),
    relationship: Yup.string().required("Relationship is required"),
    emergency_contact: Yup.boolean(),
    autorized_pickup: Yup.boolean(),
    receives_mail: Yup.boolean(),
    custody: Yup.boolean(),
});

const GuardianForm = ({ values, onChange, onCancel }) => {

    const formik = useFormik({
        initialValues: values,
        validationSchema,
        onSubmit: (e) => e.preventDefault(),
    });

    useEffect(() => {
        onChange(formik.values);
    }, [formik.values]);


    return (
        <form onSubmit={formik.handleSubmit}>
            <Card className="px-2 py-6 w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {values.guardian.first_name ? 'Edit Guardian' : 'Add Guardian'}
                    </CardTitle>
                    <CardDescription>Update and manage the Guardian's information</CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Relationship</Label>
                        <Input
                            type="text"
                            name="relationship"
                            placeholder="Enter relationship"
                            value={formik.values.relationship}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.relationship && formik.errors.relationship && (
                            <p className="text-red-500 text-sm">{formik.errors.relationship}</p>
                        )}
                    </div>

                    {[
                        { name: "first_name", label: "First Name", placeholder: "Enter first name" },
                        { name: "last_name", label: "Last Name", placeholder: "Enter last name" },
                        { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
                        { name: "phone", label: "Phone", placeholder: "Enter phone number" },
                        { name: "address", label: "Address", placeholder: "Enter address" },
                        { name: "city", label: "City", placeholder: "Enter city" },
                        { name: "zip_code", label: "Zip Code", placeholder: "Enter zip code" },
                    ].map((field) => (
                        <div key={field.name} className="flex flex-col gap-1">
                            <Label>{field.label}</Label>
                            <Input
                                type={field.type || "text"}
                                name={`guardian.${field.name}`}
                                placeholder={field.placeholder}
                                value={formik.values.guardian[field.name]}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.guardian?.[field.name] && formik.errors.guardian?.[field.name] && (
                                <p className="text-red-500 text-sm">{formik.errors.guardian[field.name]}</p>
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col gap-1">
                        <Label>State</Label>
                        <Select
                            value={formik.values.guardian.state}
                            onValueChange={(value) => formik.setFieldValue("guardian.state", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(INDIAN_STATE).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formik.touched.guardian?.state && formik.errors.guardian?.state && (
                            <p className="text-red-500 text-sm">{formik.errors.guardian.state}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Household Income</Label>
                        <Input
                            name="guardian.household_income"
                            placeholder="Enter income"
                            value={formik.values.guardian.household_income}
                            onChange={formik.handleChange}
                        />
                    </div>
                </CardContent>

                <CardContent className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Legal Rights", field: "legal_rights" },
                        { label: "Emergency Contact", field: "emergency_contact" },
                        { label: "Authorized Pickup", field: "autorized_pickup" },
                        { label: "Receives Mail", field: "receives_mail" },
                        { label: "Custody", field: "custody" },
                        { label: "Snap Benefits", field: "guardian.snap_benifits" },
                    ].map(({ label, field }) => (
                        <div key={field} className="flex items-center justify-between border p-2 rounded-lg">
                            <Label>{label}</Label>
                            <Switch
                                checked={
                                    field.includes("guardian.")
                                        ? formik.values.guardian[field.split(".")[1]]
                                        : formik.values[field]
                                }
                                onCheckedChange={(checked) => {
                                    if (field.includes("guardian.")) {
                                        formik.setFieldValue(`guardian.${field.split(".")[1]}`, checked);
                                    } else {
                                        formik.setFieldValue(field, checked);
                                    }
                                }}
                            />
                        </div>
                    ))}
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
    );
};

export default GuardianForm;
