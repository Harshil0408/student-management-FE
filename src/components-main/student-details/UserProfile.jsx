import React from 'react'
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Calendar } from "../../components/ui/calendar"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@radix-ui/react-label'
import { Input } from '../../components/ui/input'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { COUNTRY, GENDER, INDIAN_STATE, REFERAL_SOURCE } from '../../utils/fixedData'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'

const UserProfile = ({ values, onChange, onSubmit }) => {
    return (
        <div className='w-[700px] overflow-x-hidden'>
            <form onSubmit={onSubmit}>
                <Card className="px-2 py-6">
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold'>User Profile</CardTitle>
                        <CardDescription>Update and manage user's personal information</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input
                                    name="user_info.first_name"
                                    value={values?.user_info?.first_name}
                                    onChange={(e) => onChange("user_info.first_name", e.target.value)}
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input
                                    name="user_info.last_name"
                                    value={values?.user_info?.last_name}
                                    onChange={(e) => onChange("user_info.last_name", e.target.value)}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    name="user_info.email"
                                    value={values?.user_info?.email}
                                    onChange={(e) => onChange("user_info.email", e.target.value)}
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    name="phone"
                                    value={values?.phone}
                                    onChange={(e) => onChange("phone", e.target.value)}
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input
                                    name="address"
                                    value={values?.address}
                                    onChange={(e) => onChange("address", e.target.value)}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input
                                    name="city"
                                    value={values?.city}
                                    onChange={(e) => onChange("city", e.target.value)}
                                    placeholder="City"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Birth Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !values?.date_of_birth && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {values?.date_of_birth
                                                ? values?.date_of_birth
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={values?.date_of_birth ? dayjs(values?.date_of_birth, 'DD-MM-YYYY').toDate() : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    const formatted = dayjs(date).format("DD-MM-YYYY")
                                                    onChange("date_of_birth", formatted)
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>State</Label>
                                <Select
                                    value={values?.state}
                                    onValueChange={(value) => onChange('state', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(INDIAN_STATE).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Zip Code</Label>
                                <Input
                                    name="zip_code"
                                    value={values?.zip_code}
                                    onChange={(e) => onChange("zip_code", e.target.value)}
                                    placeholder="Zip Code"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <Select
                                    value={values?.gender || ''}
                                    onValueChange={(value) => {
                                        console.log('Selected gender value:', value);
                                        onChange('gender', value);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(GENDER).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Select
                                    value={values?.country}
                                    onValueChange={(value) => onChange('country', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(COUNTRY).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Referral Source</Label>
                                <Select
                                    value={values?.referral_source || ''}
                                    onValueChange={(value) => {
                                        console.log('Selected referral value:', value);
                                        onChange('referral_source', value);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Referral Source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(REFERAL_SOURCE).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Application Statement</Label>
                                <TextArea
                                    name="statement"
                                    value={values?.statement}
                                    onChange={(e) => onChange("statement", e.target.value)}
                                    placeholder="Application Statement"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default UserProfile
