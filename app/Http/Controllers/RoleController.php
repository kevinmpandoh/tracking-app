<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $role = Role::query()
            ->where('keterangan', 'like', "%{$search}%")
            ->paginate(20)
            ->appends(['search' => $search]);

        return Inertia::render('Role/KelolaRole', [
            'role' => $role,
            'search' => $search,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'keterangan' => 'required|string|max:255',
        ]);

        Role::create($request->all());

        return redirect()->route('role.index')->with('success', 'Role berhasil ditambahkan');
    }



    public function update(Request $request, Role $role)
    {
        $request->validate([
            'keterangan' => 'required|string|max:255',
        ]);

        $role->update($request->all());

        return redirect()->route('role.index')->with('success', 'Role berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('role.index')->with('success', 'Role berhasil dihapus');
    }
}
