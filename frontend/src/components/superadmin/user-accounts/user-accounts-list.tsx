"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { UserAccountFilters } from "@/components/superadmin/user-accounts/user-account-filters"
import { EditScheduleDialog } from "@/components/superadmin/user-accounts/edit-schedule-dialog"
import { RemoveScheduleDialog } from "@/components/superadmin/user-accounts/remove-schedule-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock user account data
const userAccounts = [
	{
		id: "1",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "8:00 am - 5:00 pm",
		avatar: "SL",
	},
	{
		id: "2",
		name: "Valey Austine M. Senoy",
		role: "Employee",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "8:00 am - 5:00 pm",
		avatar: "VS",
	},
	{
		id: "3",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "8:00 am - 5:00 pm",
		avatar: "SL",
	},
	{
		id: "4",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "9:00 am - 6:00 pm",
		avatar: "SL",
	},
	{
		id: "5",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "9:00 am - 6:00 pm",
		avatar: "SL",
	},
	{
		id: "6",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "9:00 am - 6:00 pm",
		avatar: "SL",
	},
	{
		id: "7",
		name: "Sarah Lim",
		role: "Admin",
		department: "IT",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "9:00 am - 6:00 pm",
		avatar: "SL",
	},
	{
		id: "8",
		name: "Michelle Zoobrado",
		role: "Manager",
		department: "HR",
		status: "Active",
		shiftType: "Morning",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "8:30 am - 5:30 pm",
		avatar: "MZ",
	},
	{
		id: "9",
		name: "Mike Arthur Minoza",
		role: "Employee",
		department: "Engineering",
		status: "Inactive",
		shiftType: "Night",
		days: "Mon, Tue, Wed, Thu, Fri",
		hours: "10:00 pm - 7:00 am",
		avatar: "MM",
	},
	{
		id: "10",
		name: "Cherry Ann Debby",
		role: "Employee",
		department: "Marketing",
		status: "Active",
		shiftType: "Flexible",
		days: "Mon, Wed, Fri",
		hours: "9:00 am - 3:00 pm",
		avatar: "CD",
	},
]

export function UserAccountsList() {
	const isMobile = useIsMobile()
	const [currentPage, setCurrentPage] = useState(1)
	const [editingUser, setEditingUser] = useState<string | null>(null)
	const [removingUser, setRemovingUser] = useState<string | null>(null)
	const [showFilters, setShowFilters] = useState(false)
	const [activeTab, setActiveTab] = useState("all")
	const [filters, setFilters] = useState({
		search: "",
		role: "all",
		department: "all",
		status: "all",
		shiftType: "all",
	})

	const pageSize = 7
	const totalItems = userAccounts.length
	const totalPages = Math.ceil(totalItems / pageSize)

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1))
	}

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1))
	}

	const handlePageClick = (page: number) => {
		setCurrentPage(page)
	}

	const getUserById = (id: string) => {
		return userAccounts.find((user) => user.id === id) || userAccounts[0]
	}

	// Filter users based on active tab and filters
	const filteredUsers = userAccounts.filter((user) => {
		// Tab filters
		if (activeTab === "admins" && user.role !== "Admin") return false
		if (activeTab === "active" && user.status !== "Active") return false
		if (activeTab === "inactive" && user.status !== "Inactive") return false

		// Search filter
		if (
			filters.search &&
			!user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
			!user.role.toLowerCase().includes(filters.search.toLowerCase()) &&
			!user.department.toLowerCase().includes(filters.search.toLowerCase())
		) {
			return false
		}

		// Role filter
		if (filters.role !== "all" && user.role !== filters.role) {
			return false
		}

		// Department filter
		if (filters.department !== "all" && user.department !== filters.department) {
			return false
		}

		// Status filter
		if (filters.status !== "all" && user.status !== filters.status) {
			return false
		}

		// Shift Type filter
		if (filters.shiftType !== "all" && user.shiftType !== filters.shiftType) {
			return false
		}

		return true
	})

	// Paginate the filtered users
	const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

	return (
		
			<div className="max-w-6xl mx-auto">
				{/* Tabs and Search/Sort Row */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
					{/* Tabs */}
					<div className="flex bg-[#F5F6FA] rounded-xl p-2 space-x-2 shadow-sm">
						{[
							{ label: "All", value: "all" },
							{ label: "Admins", value: "admins" },
							{ label: "Active", value: "active" },
							{ label: "Inactive", value: "inactive" },
						].map((tab) => (
							<button
								key={tab.value}
								onClick={() => setActiveTab(tab.value)}
								className={`px-5 py-2 rounded-lg font-medium transition
          ${
            activeTab === tab.value
              ? "bg-white shadow text-gray-900"
              : "bg-transparent text-slate-500 hover:bg-slate-100"
          }
        `}
								style={{ outline: "none", border: "none" }}
							>
								{tab.label}
							</button>
						))}
					</div>
					{/* Search and Sort */}
					<div className="flex gap-2 w-full sm:w-auto">
						<div className="relative w-full sm:max-w-xs">
							<input
								type="search"
								placeholder="Type a command or search..."
								className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
								value={filters.search}
								onChange={(e) => setFilters({ ...filters, search: e.target.value })}
							/>
							<svg
								className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="M21 21l-4.35-4.35" />
							</svg>
						</div>
						<Button
							variant="outline"
							onClick={() => setShowFilters(!showFilters)}
							className="rounded-lg"
						>
							<Filter className="mr-2 h-4 w-4" />
							Sort
						</Button>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow border">
					<h2 className="text-xl font-semibold px-6 pt-6 pb-2">All User Accounts</h2>
					{showFilters && (
						<UserAccountFilters filters={filters} setFilters={setFilters} className="mb-6 px-6" />
					)}
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="bg-[#F5F6FA]">
									<TableHead className="py-3 px-6 font-semibold">Name</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Role</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Department</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Status</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Shift Type</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Days</TableHead>
									<TableHead className="py-3 px-6 font-semibold">Hours</TableHead>
									<TableHead className="py-3 px-6 font-semibold text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedUsers.length > 0 ? (
									paginatedUsers.map((user) => (
										<TableRow key={user.id} className="hover:bg-[#F5F6FA] transition">
											<TableCell className="py-3 px-6">
												<div className="flex items-center gap-3">
													<Avatar className="h-8 w-8 bg-gray-100 text-gray-500">
														<AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
													</Avatar>
													<span className="font-medium">{user.name}</span>
												</div>
											</TableCell>
											<TableCell className="py-3 px-6">{user.role}</TableCell>
											<TableCell className="py-3 px-6">{user.department}</TableCell>
											<TableCell className="py-3 px-6">
												<span
													className={
														user.status === "Active"
															? "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"
															: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200"
													}
												>
													{user.status}
												</span>
											</TableCell>
											<TableCell className="py-3 px-6">{user.shiftType}</TableCell>
											<TableCell className="py-3 px-6">{user.days}</TableCell>
											<TableCell className="py-3 px-6">{user.hours}</TableCell>
											<TableCell className="py-3 px-6 text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" className="h-8 w-8 p-0">
															<span className="sr-only">Open menu</span>
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem onClick={() => setEditingUser(user.id)}>
															Edit Schedule
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => setRemovingUser(user.id)}>
															Remove Schedule
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={8} className="h-24 text-center">
											No users found matching your filters.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					{/* Pagination */}
					<div className="flex items-center justify-between px-6 py-4 border-t bg-[#F5F6FA] rounded-b-xl">
						<div className="text-sm text-muted-foreground">
							Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
							{Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								className="rounded-full"
							>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Previous</span>
							</Button>
							{!isMobile && (
								<div className="flex items-center gap-1">
									{Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
										const pageNumber = i + 1
										return (
											<Button
												key={i}
												variant={pageNumber === currentPage ? "default" : "outline"}
												size="sm"
												className="w-8 h-8 rounded-full"
												onClick={() => handlePageClick(pageNumber)}
											>
												{pageNumber}
											</Button>
										)
									})}
									{totalPages > 3 && <span className="px-2">...</span>}
								</div>
							)}
							<Button
								variant="outline"
								size="sm"
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className="rounded-full"
							>
								<ChevronRight className="h-4 w-4" />
								<span className="sr-only">Next</span>
							</Button>
						</div>
					</div>
				</div>

				{/* Dialogs */}
				{editingUser && (
					<EditScheduleDialog
						open={!!editingUser}
						onOpenChange={() => setEditingUser(null)}
						user={getUserById(editingUser)}
					/>
				)}

										{removingUser && (
											<RemoveScheduleDialog
												open={!!removingUser}
												onOpenChange={() => setRemovingUser(null)}
												user={getUserById(removingUser)}
											/>
										)}
							</div>
					)
				}