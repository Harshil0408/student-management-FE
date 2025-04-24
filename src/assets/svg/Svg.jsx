import { logoPath, dashboardPath1, dashboardPath2 } from './svgPaths';

export const LogoSVG = () => {
    return (
        <svg id="NMJCA_Logo_Dark_Red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 556.5 211.8">
            <path fill="#c3272e" d={logoPath}></path>
        </svg>
    )
}

export const DashboardSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-5 w-5">
            <path d={dashboardPath1}></path>
            <path d={dashboardPath2}></path>
        </svg>
    )
}

export const StudentsSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
}

export const ReportsSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-files h-5 w-5"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path></svg>
    )
}

export const PeopleSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing h-5 w-5"><circle cx="12" cy="5" r="1"></circle><path d="m9 20 3-6 3 6"></path><path d="m6 8 6 2 6-2"></path><path d="M12 10v4"></path></svg>
    )
}

export const ModeSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
    )
}

export const HelpSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
    )
}

export const Logo2Svg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M21.0236 16C21.0236 15.8215 21.0144 15.6457 20.9958 15.4712H30L29.2068 14.678H20.8465C20.7579 14.3554 20.6389 14.0461 20.4908 13.7526H28.2814L27.4882 12.9594H19.9951C19.7214 12.5998 19.4002 12.2786 19.0406 12.0049V4.5118L18.2474 3.7186V11.5092C17.9539 11.3611 17.6446 11.2421 17.322 11.1535V2.7932L16.5288 2V11.0042C16.3543 10.9856 16.1785 10.9764 16 10.9764C15.8215 10.9764 15.6457 10.9856 15.4712 11.0042V2L14.678 2.7932V11.1535C14.3554 11.2421 14.0461 11.3611 13.7526 11.5092V3.7186L12.9594 4.5118V12.0049C12.5998 12.2786 12.2786 12.5998 12.0049 12.9594H4.5118L3.7186 13.7526H11.5092C11.3611 14.0461 11.2421 14.3554 11.1535 14.678H2.7932L2 15.4712H11.0042C10.9856 15.6457 10.9764 15.8215 10.9764 16C10.9764 16.1785 10.9856 16.3543 11.0042 16.5288H2L2.7932 17.322H11.1535C11.2421 17.6446 11.3611 17.9539 11.5092 18.2474H3.7186L4.5118 19.0406H12.0049C12.2786 19.4002 12.5998 19.7214 12.9594 19.9951V27.4882L13.7526 28.2814V20.4908C14.0461 20.6389 14.3554 20.7579 14.678 20.8465V29.2068L15.4712 30V20.9958C15.6457 21.0144 15.8215 21.0236 16 21.0236C16.1785 21.0236 16.3543 21.0144 16.5288 20.9958V30L17.322 29.2068V20.8465C17.6446 20.7579 17.9539 20.6389 18.2474 20.4908V28.2814L19.0406 27.4882V19.9951C19.4002 19.7214 19.7214 19.4002 19.9951 19.0406H27.4882L28.2814 18.2474H20.4908C20.6389 17.9539 20.7579 17.6446 20.8465 17.322H29.2068L30 16.5288H20.9958C21.0144 16.3543 21.0236 16.1785 21.0236 16ZM11.7696 16C11.7696 13.6667 13.6667 11.7696 16 11.7696C18.3333 11.7696 20.2304 13.6667 20.2304 16C20.2304 18.3333 18.332 20.2304 16 20.2304C13.668 20.2304 11.7696 18.332 11.7696 16Z" fill="#DB2626"></path></svg>
    )
}

export const SearchSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search mr-2 h-4 w-4 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
    )
}

export const ProfileSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user text-card-foreground w-2/3 h-2/3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )
}

export const SecureSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock mr-2 h-4 w-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    )
}

export const LogoutSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock mr-2 h-4 w-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    )
}

export const AddIconSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus h-3.5 w-3.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
    )
}

export const EditStudentSvg = () => {
    return (
        <div className=' className={`inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors p-2 cursor-pointer ${className}`}'>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen p-0.5 py-1"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
        </div>
    )
}

export const PrintSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer h-3.5 w-3.5"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path><rect x="6" y="14" width="12" height="8" rx="1"></rect></svg>
    )
}

export const ExportSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-files h-3.5 w-3.5"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path></svg>
    )
}

export const SaveSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save h-3.5 w-3.5"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
    )
}

export const EditSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
    )
}