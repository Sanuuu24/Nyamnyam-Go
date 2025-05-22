<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        $data = Banner::all();
        return response(["message" => "Banner is founded",  "data" => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image_banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time() . '.' . $request->image_banner->extension();

        $request->image_banner->move(public_path('images/banner'), $imageName);

        Banner::create([
            'image_banner' => url('/images/banner/' . $imageName),
            'image_banner_name' => $imageName,
        ]);

        return response(["message" => "banner is created successfully"], 201);
    }
}
