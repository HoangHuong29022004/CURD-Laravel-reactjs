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
        return response()->json('Thêm thành công');
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

        return response()->json('Cập nhật thành công');
    }

    public function destroy(string $id)
    {
        $item = Item::find($id);
        if ($item) {
            $item->delete();
            return response()->json('Đã di chuyển vào thùng rác thành công');
        }
        return response()->json('Không tìm thấy mục', 404);
    }

    public function trashed()
    {
        $items = Item::onlyTrashed()->get();
        return response()->json($items);
    }

    public function restore(string $id)
    {
        $item = Item::withTrashed()->find($id);
        $item->restore();

        return response()->json('Khôi phục thành công');
    }

    public function forceDelete(string $id)
    {
        $item = Item::withTrashed()->find($id);
        $item->forceDelete();

        return response()->json('Xóa vĩnh viễn thành công');
    }
}
