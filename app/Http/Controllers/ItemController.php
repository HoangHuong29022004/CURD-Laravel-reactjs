<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = new Item([
            'name' => $request->get('name'),
            'price' => $request->get('price')
        ]);

        $item->save();
        return response()->json('Successfully added');
    }

    public function edit(string $id)
    {
        $item = Item::find($id);
        return response()->json($item);
    }

    public function update(Request $request, string $id)
    {
        $item = Item::find($id);
        $item->name = $request->get('name');
        $item->price = $request->get('price');
        $item->save();

        return response()->json('Successfully Updated');
    }

    public function destroy(string $id)
    {
        $item = Item::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }
}