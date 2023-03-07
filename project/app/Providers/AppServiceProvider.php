<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DocumentResource;
use App\Http\Resources\OrganizationResource;
use App\Http\Resources\TicketResource;
use App\Http\Resources\UnitResource;
use App\Http\Resources\UserResource;
use App\Repositories\DepartmentRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\OrganizataionRepository;
use App\Repositories\TicketRepository;
use App\Repositories\UnitRepository;
use App\Repositories\UserRepository;
use App\Services\JsonResponse;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(OrganizationController::class, function ($app) {
            return new OrganizationController(new JsonResponse(OrganizationResource::class), $app->make(OrganizataionRepository::class));
        });

        $this->app->bind(DepartmentController::class, function ($app) {
            return new DepartmentController(new JsonResponse(DepartmentResource::class), $app->make(DepartmentRepository::class));
        });

        $this->app->bind(UnitController::class, function ($app) {
            return new UnitController(new JsonResponse(UnitResource::class), $app->make(UnitRepository::class));
        });

        $this->app->bind(DocumentController::class, function ($app) {
            return new DocumentController(new JsonResponse(DocumentResource::class), $app->make(DocumentRepository::class));
        });

        $this->app->bind(TicketController::class, function ($app) {
            return new TicketController(new JsonResponse(TicketResource::class), $app->make(TicketRepository::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserRepository::class));
        });
    }
}
