import React from 'react'
import { DashboardSvg, HelpSvg, Logo2Svg, ModeSvg, PeopleSvg, ReportsSvg, StudentsSvg } from '../assets/svg/Svg'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'

const Sidebar = () => {
    const location = useLocation()
    const currentPath = location.pathname.slice(1)

    const linkClass = (path) => `
        group flex h-9 w-9 items-center justify-center
        ${currentPath.startsWith(path)
            ? 'bg-red-600 rounded-full text-white p-0'
            : 'opacity-60 '
        }
        transition-all duration-200
    `

    return (
        <div>
            <div className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex'>
                <aside className='flex h-full flex-col justify-between py-5'>
                    <nav className='flex flex-col items-center gap-4'>
                        <div className='px-2'>
                            <Logo2Svg />
                        </div>

                        <div className='h-[1px] w-10 bg-border/60'></div>

                        <div className='flex flex-col items-center gap-3'>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/dashboard" className={linkClass('dashboard')}>
                                        <DashboardSvg className={currentPath.startsWith('dashboard') ? 'text-white' : ''} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Dashboard
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/students" className={linkClass('students')}>
                                        <StudentsSvg className={currentPath.startsWith('students') ? 'text-white' : ''} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Students
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/reports" className={linkClass('reports')}>
                                        <ReportsSvg className={currentPath.startsWith('reports') ? 'text-white' : ''} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Reports
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/people" className={linkClass('people')}>
                                        <PeopleSvg className={currentPath.startsWith('people') ? 'text-white' : ''} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    People
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </nav>

                    <div className='flex flex-col items-center gap-2'>
                        <button className='group flex h-9 w-9 items-center opacity-60 justify-center rounded-lg hover:bg-accent transition-all duration-200'>
                            <ModeSvg />
                        </button>
                        <button className='group flex h-9 w-9 items-center opacity-60 justify-center rounded-lg hover:bg-accent transition-all duration-200'>
                            <HelpSvg />
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Sidebar