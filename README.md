### Project Objective
Build a secure, role-based system for tracking attendance, managing shifts, processing manual time entries, and supporting administrative oversight—all within a 1-month delivery timeline.

## Project Scope
**In Scope**

- Real-time clock-in/out with validations
- Manual request submission and admin approval
- Shift creation and assignment
- Time log visibility (employee + admin)
- Role-based access (Employee, Admin, Super Admin)
- Admin login mode switch
- Audit trail for time logs and shift changes

**Out of Scope**

- Advanced reporting (e.g. overtime, late trends)
- Notifications/reminders
- Mobile geo-tagging or biometric device sync

### Key Deliverables

|        Deliverable         |                   Description                             |
| -------------------------- | --------------------------------------------------------- |
| Clock In/Out Engine        |	Real-time + manual time logging with validations         |
| Manual Request Review      |	Admins review/approve/reject logs                        |
| Shift Management	         | Create/edit shifts, assign users/teams                    |
| User & Role Management     |	Assign roles, activate/inactivate, RBAC enforced         |
| Time Log Dashboard         |	Logs filtered by user/date/type (admin & employee views) |
| Dual-Context Login         |	Admins choose Employee/Admin login mode                  |
| Audit Trail	               | System logs of changes, visible to Super Admins           |

## Work Breakdown Structure (WBS)
- Discovery & Design
    - Wireframe clock-in page, admin dashboard, shift editor
    - Design RBAC matrix and session flow (admin vs employee)
    - API schema & data model design
 
- Clock In / Clock Out Module
    - Implement real-time clock-in/out functionality
    - Backend validations for:
       - Duplicate entries
       - Overlapping shifts
       - Early/late detection 
    - Manual request submission form (with reason & timestamp)
    - Store logs securely with timestamps and source (manual/system)
 
- Manual Request Management
    - Admin dashboard to view/filter pending manual entries
    - Approve/decline action with optional comments
    - Change log generated for each decision
    - Super Admin inherits all permissions
 
- Shift Management
    - CRUD for shifts (start/end, recurrence, breaks)
    - Assign shifts to individual users or teams
    - Display assigned shifts in employee dashboard
    - Validate conflicts or duplicate shift overlap
 
- Time Log Dashboard
    - Employee view: personal time logs and request history
    - Admin view:
        - Filter by employee, date, shift, source
        - Edit/add time logs for others
        - Auto-generate audit record on modification
 
- Admin Login Context Switching

    - Implement role-based login option (Admin or Employee mode)
    - Store session context and enforce it during runtime
    - UI clearly reflects current context
    - Restrict data/actions based on selected context

- Audit Trail & Change Logging

    - Capture all critical events:
        - Manual log requests
        - Shift changes
        - Admin assignments
    - Immutable logs with timestamps and actor identity
    - Super Admin dashboard for centralized audit review

- Testing & Go-Live
    - Unit & integration tests (time log logic, RBAC enforcement)
    - RBAC penetration testing (employee shouldn’t spoof admin actions)
    - UAT with HR/Admins
    - Production deployment & admin onboarding

## Risk Analysis Document
|                            Risk                           | Impact  | Likelihood |                                              Description                                                     |
| --------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| Duplicate or overlapping clock-ins	                      | High	  | Medium	   | Backend validation rules to block duplicates and overlapping entries. Add test cases.                        |
| Shift configuration errors (e.g. wrong time, recurrence)	| Medium	| Medium	   | Add frontend validations and default values. Review shift setup via UAT.                                     |
| Manual time fraud (fake log submissions)	                | High	  | Low	       | Mandatory approval flow. Full audit trail with reviewer accountability.                                      |
| RBAC misconfigurations (privilege escalation)             |	High	  | Medium	   | Role-based tests and permission coverage in QA. Use middleware access controls.                              |
| Context-switch login confusion	                          | Medium	| Medium	   | Clear UI indication of current role (Admin/Employee). Prevent mixing context in same session.                |
| Audit trail gaps	                                        | High	  | Low	       | Log all critical events (manual log changes, role updates, shift edits). Enforce immutability on audit logs. |
| Data inconsistency during onboarding	                    | Medium	| Low	       | Validate input data on frontend and backend. Use transactional DB writes for logs and shifts.                |
Admin overload due to lack of filters in time logs	        | Medium	| Medium	   | Prioritize filters by date/employee/type for MVP. Use indexed DB queries.                                    |
