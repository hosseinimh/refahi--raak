<?php

// use App\Http\Controllers\DashboardController;
// use App\Http\Controllers\DepartmentController;
// use App\Http\Controllers\DocumentController;
// use App\Http\Controllers\OrganizationController;
// use App\Http\Controllers\TicketController;
// use App\Http\Controllers\UnitController;
// use App\Http\Controllers\UserController;
// use Illuminate\Support\Facades\Route;

// **Route::get('users', [UserController::class, 'index']);
// ** not logged users
// Route::middleware(['cors'])->group(function () {
//     Route::post('users/login', [UserController::class, 'login']);
//     Route::post('users/logout', [UserController::class, 'logout']);
// });

// **'administrator' type users
// Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
//     Route::post('dashboard/review_admin', [DashboardController::class, 'reviewAdmin']);

//     Route::get('users', [UserController::class, 'index']);
//     Route::post('users', [UserController::class, 'index']);
//     Route::post('users/show/{user}', [UserController::class, 'showAdmin']);
//     Route::post('users/store/{unit}', [UserController::class, 'store']);
//     Route::post('users/store_admin', [UserController::class, 'storeAdmin']);
//     Route::post('users/update/{user}', [UserController::class, 'update']);
//     Route::post('users/change_password/{user}', [UserController::class, 'changePassword']);
//     Route::post('users/delete/{user}', [UserController::class, 'delete']);

//     Route::post('organizations/show/{model}', [OrganizationController::class, 'show']);
//     Route::post('organizations/store', [OrganizationController::class, 'store']);
//     Route::post('organizations/update/{model}', [OrganizationController::class, 'update']);
//     Route::post('organizations', [OrganizationController::class, 'index']);

//     Route::post('departments/show/{model}', [DepartmentController::class, 'show']);
//     Route::post('departments/store/{organization}', [DepartmentController::class, 'store']);
//     Route::post('departments/update/{model}', [DepartmentController::class, 'update']);
//     Route::post('departments/{organization}', [DepartmentController::class, 'index']);

//     Route::post('units/store/{department}', [UnitController::class, 'store']);
//     Route::post('units/update/{model}', [UnitController::class, 'update']);
//     Route::post('units/{department}', [UnitController::class, 'index']);

//     Route::post('documents/show/{model}', [DocumentController::class, 'show']);
//     Route::post('documents/store/{unit}', [DocumentController::class, 'store']);
//     Route::post('documents/update/{model}', [DocumentController::class, 'update']);
//     Route::post('documents/{unit}', [DocumentController::class, 'indexAdmin']);

//     Route::post('tickets/show_admin/{model}', [TicketController::class, 'showAdmin']);
//     Route::post('tickets/{unit}', [TicketController::class, 'indexAdmin']);
//     Route::post('tickets/store/{unit}', [TicketController::class, 'storeAdmin']);
//     Route::post('tickets/store_thread_admin/{model}', [TicketController::class, 'storeThreadAdmin']);
//     Route::post('tickets/seen/{model}', [TicketController::class, 'seenAdmin']);
// });


//** */ 'user' type users
// Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
//     Route::post('dashboard/review_user', [DashboardController::class, 'reviewUser']);

//     Route::post('users/show', [UserController::class, 'showUser']);

//     Route::post('documents', [DocumentController::class, 'indexUser']);

//     Route::post('tickets/show_user/{model}', [TicketController::class, 'showUser']);
//     Route::post('tickets', [TicketController::class, 'indexUser']);
//     Route::post('tickets/store', [TicketController::class, 'storeUser']);
//     Route::post('tickets/store_thread_user/{model}', [TicketController::class, 'storeThreadUser']);
//     Route::post('tickets/seen/{model}', [TicketController::class, 'seenUser']);
//     Route::post('tickets/change_status/{model}', [TicketController::class, 'changeStatus']);
// });

//** */ 'user|administrator' type users
// Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
//     Route::post('units/show/{model}', [UnitController::class, 'show']);
// });






// ms aziziyan

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\LoginFormController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlaceCategoryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\EquipmentCategoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\PlaceEquipmentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [FrontController::class, 'homepage']);

//User

Route::get('/login', [UserController::class, 'login']);
Route::post('/user/checkpass', [UserController::class, 'checkpass']);
Route::post('/user/save', [UserController::class, 'save']);
Route::get('/user/dashboard', [UserController::class, 'dashboard']);
Route::get('/user/logout', [UserController::class, 'logout']);
Route::get('/user/forget', [UserController::class, 'forget']);
Route::get('/user/list', [UserController::class, 'list']);
Route::get('/user/management', [UserController::class, 'management']);
Route::post('/user/add', [UserController::class, 'add']);
Route::post('/user/edit/{id}', [UserController::class, 'edit']);
Route::post('/user/update/{id}', [UserController::class, 'update']);
Route::post('/user/delete/{user}', [UserController::class, 'delete']);

//Place Category

Route::post('/place/placelist', [PlaceCategoryController::class, 'list']);
Route::get('/place/addplace', [PlaceCategoryController::class, 'add']);
Route::get('/place/editplace', [PlaceCategoryController::class, 'edit']);
Route::get('/place/deleteplace', [PlaceCategoryController::class, 'delete']);


//Equpment Category


Route::post('/equipcat/catlist', [EquipmentCategoryController::class, 'list']);
Route::get('/equipcat/addcat', [EquipmentCategoryController::class, 'add']);
Route::get('/equipcat/delcat', [EquipmentCategoryController::class, 'delete']);
Route::get('/equipcat/changecat', [EquipmentCategoryController::class, 'change']);

//Equipment


Route::post('/equipment/catlist', [EquipmentController::class, 'list']);
Route::post('/equipment/add', [EquipmentController::class, 'add']);
Route::post('/equipment/save', [EquipmentController::class, 'save']);
Route::get('/equipment/delcat', [EquipmentController::class, 'delete']);
Route::get('/equipment/changecat', [EquipmentController::class, 'change']);

//PlaceEquipment


Route::post('/equipmentplace/catlist', [PlaceEquipmentController::class, 'list']);
Route::post('/equipmentplace/add/{id}', [PlaceEquipmentController::class, 'add']);
Route::post('/equipmentplace/save', [PlaceEquipmentController::class, 'save']);
Route::post('/equipmentplace/addserial/{id}', [PlaceEquipmentController::class, 'add_serial']);
Route::post('/equipmentplace/saveserial', [PlaceEquipmentController::class, 'save_serial']);
Route::post('/equipmentplace/delcat/{id}', [PlaceEquipmentController::class, 'delete']);
Route::post('/equipmentplace/updatecat/{id}', [PlaceEquipmentController::class, 'update']);
Route::post('/equipmentplace/edit/{id}', [PlaceEquipmentController::class, 'edit']);



//Place
Route::get('/place/management', [PlaceController::class, 'management']);
Route::post('/place/list', [PlaceController::class, 'list']);
Route::post('/place/add', [PlaceController::class, 'add']);
Route::post('/place/save', [PlaceController::class, 'save']);
Route::post('/place/edit/{id}', [PlaceController::class, 'edit']);
Route::post('/place/update/{id}', [PlaceController::class, 'update']);
Route::post('/place/delplace/{pid}', [PlaceController::class, 'delete']);
Route::post('/place/rentsave', [PlaceController::class, 'rent_save']);
Route::post('/place/rentadd/{id}', [PlaceController::class, 'rent_add']);
Route::post('/place/listrent', [PlaceController::class, 'rent_list']);
Route::get('/place/rentplace', [PlaceController::class, 'rent']);
Route::get('/place/sellplace', [PlaceController::class, 'sell']);
Route::get('/place/rebuild', [PlaceController::class, 'rebuild']);
