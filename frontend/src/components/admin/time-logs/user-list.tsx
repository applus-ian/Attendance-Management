"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const users = [
	{
		id: "1",
		name: "Valey Austine M. Senoy",
		position: "Senior Developer",
		department: "Engineering",
	},
	{
		id: "2",
		name: "Shiela Marie Arcillo",
		position: "UI/UX Designer",
		department: "Design",
	},
	{
		id: "3",
		name: "Michelle Zoobrado",
		position: "Project Manager",
		department: "Management",
	},
	{
		id: "4",
		name: "Mike Arthur Minoza",
		position: "QA Engineer",
		department: "Quality Assurance",
	},
	{
		id: "5",
		name: "Lyn Sanchez",
		position: "Frontend Developer",
		department: "Engineering",
	},
	{
		id: "6",
		name: "Robert Johnson",
		position: "Backend Developer",
		department: "Engineering",
	},
	{
		id: "7",
		name: "Sarah Williams",
		position: "HR Manager",
		department: "Human Resources",
	},
	{
		id: "8",
		name: "David Chen",
		position: "DevOps Engineer",
		department: "Operations",
	},
	{
		id: "9",
		name: "Maria Garcia",
		position: "Marketing Specialist",
		department: "Marketing",
	},
	{
		id: "10",
		name: "James Wilson",
		position: "Data Analyst",
		department: "Analytics",
	},
]

interface UserListProps {
	selectedUserId: string
	users: typeof users
}

export function UserList({ selectedUserId, users }: UserListProps) {
	const router = useRouter()

	const handleSelectUser = (userId: string) => {
		router.push(`/admin/time-logs/${userId}`)
	}

	return (
		<div className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto">
			{users.map((user) => (
				<div
					key={user.id}
					className={cn(
						"px-3 py-2 rounded-md text-sm cursor-pointer",
						user.id === selectedUserId
							? "bg-orange-100 text-orange-900"
							: "hover:bg-muted",
					)}
					onClick={() => handleSelectUser(user.id)}
				>
					{user.name}
				</div>
			))}
		</div>
	)
}
