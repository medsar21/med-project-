<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cars;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = cars::all();
        return response()->json(['cars' => $cars], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'model' => 'required|string',
            'mark' => 'required|string',
            'year' => 'required|numeric',
            'doors' => 'required|string',
            'air' => 'required|string',
            'transmission' => 'required|string',
            'fuel' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
        } else {
            $imageName = null;

        }


        // Create car
        $car = cars::create([
            'name' => $request->name,
            'price' => $request->price,
            'model' => $request->model,
            'mark' => $request->mark,
            'year' => $request->year,
            'doors' => $request->doors,
            'air' => $request->air,
            'transmission' => $request->transmission,
            'fuel' => $request->fuel,
            'image' => $imageName,
        ]);

        return response()->json(['car' => $car], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
