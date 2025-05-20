<?php
// app/Http/Controllers/HolidayController.php

namespace App\Http\Controllers;

use App\Models\Holiday;
use Illuminate\Http\Request;
use App\Services\HolidayService;
use App\Http\Resources\HolidayResource;
use App\Http\Requests\HolidayRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class HolidayController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected HolidayService $service)
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * GET /api/holidays
     */
    public function index()
    {
        $this->authorize('viewAny', Holiday::class);

        $holidays = Holiday::orderBy('date', 'desc')->paginate(20);
        return HolidayResource::collection($holidays);
    }

    /**
     * POST /api/holidays
     */
    public function store(HolidayRequest $req)
    {
        $this->authorize('create', Holiday::class);

        $holiday = $this->service->createManual($req->validated());
        return new HolidayResource($holiday);
    }

    /**
     * PUT /api/holidays/{holiday}
     */
    public function update(HolidayRequest $req, Holiday $holiday)
    {
        $this->authorize('update', $holiday);

        $holiday = $this->service->updateManual($holiday, $req->validated());
        return new HolidayResource($holiday);
    }

    /**
     * DELETE /api/holidays/{holiday}
     */
    public function destroy(Holiday $holiday)
    {
        $this->authorize('delete', $holiday);

        $this->service->deleteManual($holiday);
        return response()->noContent();
    }

    /**
     * POST /api/holidays/sync
     */
    public function sync(Request $req)
    {
        $this->authorize('sync', Holiday::class);

        $year = (int)$req->input('year', now()->year);
        $this->service->syncAuto($year);

        return response()->json([
            'message' => "Synced Philippine holidays for {$year}."
        ]);
    }
}
