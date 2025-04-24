import React from 'react'
import { LogoutSvg, ProfileSvg, SearchSvg, SecureSvg } from '../../assets/svg/Svg'
import { Input } from '@/components/ui/input'
import { clearTokens } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const Header = ({ headerText, description, isLoading = false }) => {
    const { loggedinUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <div className="">
            <div className='flex flex-col gap-6 py-6'>
                <div className='flex justify-between items-center'>
                    <div>
                        {isLoading ? (
                            <Skeleton className="h-7 w-32" />
                        ) : (
                            <h1 className="text-xl font-semibold">Students</h1>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-[350px]">
                            {isLoading ? (
                                <Skeleton className="h-[35px] w-full" />
                            ) : (
                                <>
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <SearchSvg className="text-muted-foreground h-4 w-4" />
                                    </div>
                                    <Input
                                        className="w-full h-[35px] pl-10 focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 focus:border-input focus-visible:border-input"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </>
                            )}
                        </div>

                        {isLoading ? (
                            <Skeleton className="h-9 w-9 rounded-full" />
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 overflow-hidden rounded-full">
                                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium">
                                        <ProfileSvg />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-46" align="end">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{loggedinUser?.username}</span>
                                            <span className="text-xs text-muted-foreground">{loggedinUser?.email}</span>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <span><ProfileSvg /></span>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span><SecureSvg /></span>
                                        Security
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => dispatch(clearTokens())} >
                                        <span><LogoutSvg /></span>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                <Card className="p-6">
                    {isLoading ? (
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-[250px]" />
                            <Skeleton className="h-4 w-[400px]" />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">{headerText}</h2>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Header