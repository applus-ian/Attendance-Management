<?php

use App\Http\Controllers\CountryAssignController;
use App\Http\Controllers\DepartmentAssignController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeProjectController;
use App\Http\Controllers\EmploymentTypeController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\LocationAssignmentController;
use App\Http\Controllers\OfficeAssignController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectRoleController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SkillCategoryController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TeamAssignController;
use App\Http\Controllers\EmployeeSkillController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentationController;

// Routes for Authentication
Route::controller(AuthController::class)
    ->prefix('auth')
    ->group(function () {
        Route::post('/validate-token', 'validateToken');
        Route::post('/login', 'login');
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', 'logout');
            Route::get('/fetch-user', 'fetchUser');
            Route::patch('/change-password', 'changeOwnPassword');
            Route::patch('/update-personal-info', 'updateOwnPersonalInfo');
            Route::patch('/update-residential-info', 'updateOwnResidentialInfo');
            Route::patch('/update-gov-bank-numbers', 'updateOwnGovBankNumbers');
        });
});

// Routes for Documentation
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(DocumentationController::class)->prefix('documentations')->group(function () {
        Route::get('/list', 'index')->middleware('permission:documentation_list');
        Route::post('/new', 'create')->middleware('permission:documentation_create');
        Route::get('/{documentation}', 'show')->middleware('permission:documentation_view');
        Route::put('/update/{documentation}', 'update')->middleware('permission:documentation_update');
        Route::delete('/delete/{documentation}', 'destroy')->middleware('permission:documentation_delete');
    });
});

// Routes for Document Type
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(DocumentTypeController::class)->prefix('document-types')->group(function () {
        Route::get('/list', 'index')->middleware('permission:document_type_list');
        Route::post('/new', 'create')->middleware('permission:document_type_create');
        Route::get('/{document_type}', 'show')->middleware('permission:document_type_view');
        Route::put('/update/{document_type}', 'update')->middleware('permission:document_type_update');
        Route::delete('/delete/{document_type}', 'destroy')->middleware('permission:document_type_delete');
    });
});

// Routes for Employee
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(EmployeeController::class)->prefix('employees')->group(function () {
        Route::get('/list', 'index')->middleware('permission:employee_list');
        Route::post('/new', 'create')->middleware('permission:employee_create');
        Route::get('/{employee_id}', 'show')->middleware('permission:employee_view');
        Route::put('/update/{employee}', 'update')->middleware('permission:employee_update');
        Route::delete('/delete/{employee}', 'destroy')->middleware('permission:employee_delete');
    });
});

// Routes for Employee Project
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(EmployeeProjectController::class)->prefix('employee-projects')->group(function () {
        Route::get('/list', 'index')->middleware('permission:employee_project_list');
        Route::post('/new', 'create')->middleware('permission:employee_project_create');
        Route::get('/{employee_project}', 'show')->middleware('permission:employee_project_view');
        Route::put('/update/{employee_project}', 'update')->middleware('permission:employee_project_update');
        Route::delete('/delete/{employee_project}', 'destroy')->middleware('permission:employee_project_delete');
    });
});

// Routes for Employee Skill
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(EmployeeSkillController::class)->prefix('employee-skills')->group(function () {
        Route::get('/list', 'index')->middleware('permission:employee_skill_list');
        Route::post('/new', 'create')->middleware('permission:employee_skill_create');
        Route::get('/{employee_id}', 'show')->middleware('permission:employee_skill_view');
        Route::put('/update/{employee_skill}', 'update')->middleware('permission:employee_skill_update');
        Route::delete('/delete/{employee_skill}', 'destroy')->middleware('permission:employee_skill_delete');
    });
});

// Routes for Employment Type
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(EmploymentTypeController::class)->prefix('employment-types')->group(function () {
        Route::get('/list', 'index')->middleware('permission:employment_type_list');
        Route::post('/new', 'create')->middleware('permission:employment_type_create');
        Route::get('/{employment_type}', 'show')->middleware('permission:employment_type_view');
        Route::put('/update/{employment_type}', 'update')->middleware('permission:employment_type_update');
        Route::delete('/delete/{employment_type}', 'destroy')->middleware('permission:employment_type_delete');
    });
});

// Routes for Project
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProjectController::class)->prefix('projects')->group(function () {
        Route::get('/list', 'index')->middleware('permission:project_list');
        Route::post('/new', 'create')->middleware('permission:project_create');
        Route::get('/{project}', 'show')->middleware('permission:project_view');
        Route::put('/update/{project}', 'update')->middleware('permission:project_update');
        Route::delete('/delete/{project}', 'destroy')->middleware('permission:project_delete');
    });
});

// Routes for Project Role
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProjectRoleController::class)->prefix('project-roles')->group(function () {
        Route::get('/list', 'index')->middleware('permission:project_role_list');
        Route::post('/new', 'create')->middleware('permission:project_role_create');
        Route::get('/{project_role}', 'show')->middleware('permission:project_role_view');
        Route::put('/update/{project_role}', 'update')->middleware('permission:project_role_update');
        Route::delete('/delete/{project_role}', 'destroy')->middleware('permission:project_role_delete');
    });
});

// Routes for Job Position
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller( JobPositionController::class)->prefix('job-positions')->group(function () {
        Route::get('/list', 'index')->middleware('permission:job_position_list');
        Route::post('/new', 'create')->middleware('permission:job_position_create');
        Route::get('/{job_position}', 'show')->middleware('permission:job_position_view');
        Route::put('/update/{job_position}', 'update')->middleware('permission:job_position_update');
        Route::delete('/delete/{job_position}', 'destroy')->middleware('permission:job_position_delete');
    });
});

// Routes for Location Assignment
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller( LocationAssignmentController::class)->prefix('location-assignments')->group(function () {
        Route::get('/list', 'index')->middleware('permission:location_assignment_list');
        Route::post('/new', 'create')->middleware('permission:location_assignment_create');
        Route::get('/{location_assignment}', 'show')->middleware('permission:location_assignment_view');
        Route::put('/update/{location_assignment}', 'update')->middleware('permission:location_assignment_update');
        Route::delete('/delete/{location_assignment}', 'destroy')->middleware('permission:location_assignment_delete');
    });
});

// Routes for Country Assign
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(CountryAssignController::class)->prefix('country-assigns')->group(function () {
        Route::get('/list', 'index')->middleware('permission:country_assign_list');
        Route::post('/new', 'create')->middleware('permission:country_assign_create');
        Route::get('/{country_assign}', 'show')->middleware('permission:country_assign_view');
        Route::put('/update/{country_assign}', 'update')->middleware('permission:country_assign_update');
        Route::delete('/delete/{country_assign}', 'destroy')->middleware('permission:country_assign_delete');
    });
});

// Routes for Office Assign
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(OfficeAssignController::class)->prefix('office-assigns')->group(function () {
        Route::get('/list', 'index')->middleware('permission:office_assign_list');
        Route::post('/new', 'create')->middleware('permission:office_assign_create');
        Route::get('/{office_assign}', 'show')->middleware('permission:office_assign_view');
        Route::put('/update/{office_assign}', 'update')->middleware('permission:office_assign_update');
        Route::delete('/delete/{office_assign}', 'destroy')->middleware('permission:office_assign_delete');
    });
});

// Routes for Team Assign
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(TeamAssignController::class)->prefix('team-assigns')->group(function () {
        Route::get('/list', 'index')->middleware('permission:team_assign_list');
        Route::post('/new', 'create')->middleware('permission:team_assign_create');
        Route::get('/{team_assign}', 'show')->middleware('permission:team_assign_view');
        Route::put('/update/{team_assign}', 'update')->middleware('permission:team_assign_update');
        Route::delete('/delete/{team_assign}', 'destroy')->middleware('permission:team_assign_delete');
    });
});

// Routes for Department Assign
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(DepartmentAssignController::class)->prefix('department-assigns')->group(function () {
        Route::get('/list', 'index')->middleware('permission:department_assign_list');
        Route::post('/new', 'create')->middleware('permission:department_assign_create');
        Route::get('/{department_assign}', 'show')->middleware('permission:department_assign_view');
        Route::put('/update/{department_assign}', 'update')->middleware('permission:department_assign_update');
        Route::delete('/delete/{department_assign}', 'destroy')->middleware('permission:department_assign_delete');
    });
});

// Routes for Role
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(RoleController::class)->prefix('roles')->group(function () {
        Route::get('/list', 'index')->middleware('permission:role_list');
        Route::post('/new', 'create')->middleware('permission:role_create');
        Route::get('/all-roles-with-permissions', 'getAllRolesWithPermissions');
        Route::get('all-permissions', 'getAllPermissions');
        Route::get('/{role}', 'show')->middleware('permission:role_view');
        Route::put('/update/{role}', 'update')->middleware('permission:role_update');
        Route::delete('/delete/{role}', 'destroy')->middleware('permission:role_delete');
    });
});

// Routes for Skill
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(SkillController::class)->prefix('skills')->group(function () {
        Route::get('/list', 'index')->middleware('permission:skill_list');
        Route::post('/new', 'create')->middleware('permission:skill_create');
        Route::get('/{skill}', 'show')->middleware('permission:skill_view');
        Route::put('/update/{skill}', 'update')->middleware('permission:skill_update');
        Route::delete('/delete/{skill}', 'destroy')->middleware('permission:skill_delete');
    });
});

// Routes for Skill Category
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(SkillCategoryController::class)->prefix('skill-categories')->group(function () {
        Route::get('/list', 'index')->middleware('permission:skill_category_list');
        Route::post('/new', 'create')->middleware('permission:skill_category_create');
        Route::get('/{skill_category}', 'show')->middleware('permission:skill_category_view');
        Route::put('/update/{skill_category}', 'update')->middleware('permission:skill_category_update');
        Route::delete('/delete/{skill_category}', 'destroy')->middleware('permission:skill_category_delete');
    });
});

// Routes for User Role
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(UserRoleController::class)->prefix('user-roles')->group(function () {
        Route::get('/list', 'index')->middleware('permission:user_role_list');
        Route::post('/new', 'create')->middleware('permission:user_role_create');
        Route::get('/{user_role}', 'show')->middleware('permission:user_role_view');
        Route::put('/update/{user_role}', 'update')->middleware('permission:user_role_update');
        Route::delete('/delete/{user_role}', 'destroy')->middleware('permission:user_role_delete');
    });
});

// Routes for User
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(UserController::class)->prefix('users')->group(function () {
        // Route::get('/list', 'index')->middleware('permission:user_list');
        Route::post('/new', 'create')->middleware('permission:user_register');
        // Route::get('/{user}', 'show')->middleware('permission:user_view');
        // Route::put('/update/{user}', 'update')->middleware('permission:user_update');
        // Route::delete('/delete/{user}', 'destroy')->middleware('permission:user_delete');
    });
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProjectController::class)->prefix('tests')->group(function () {
        Route::post('/test', 'test');
    });
});
