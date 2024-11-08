<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Role;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::query()
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->where('users.name', 'like', "%{$search}%")
            ->orWhere('users.username', 'like', "%{$search}%")
            ->paginate(5)
            ->appends(['search' => $search]);

        return Inertia::render('Users/User', [
            'users' => $users,
            'search' => $search,
            'roles' => Role::all()

        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required'],
            'username' => ['required', 'unique:users'],
            'password' => ['required'],
            "role_id" => "required"
        ], [
            'username.unique' => 'Username sudah digunakan',
        ]);




        $validatedData['password'] = bcrypt($validatedData['password']);

        User::create($validatedData);

        return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan');
    }

    public function update(Request $request, User $user)
    {

        $validatedData = $request->validate([
            'name' => ['required'],
            'username' => ['required'],
            'role' => ['required'],
        ]);

        if ($request->has('password')) {
            $validatedData['password'] = bcrypt($request['password']);
        }

        // Cek username
        if ($user->username != $validatedData['username']) {
            $request->validate([
                'username' => ['unique:users'],
            ], [
                'username.unique' => 'Username sudah digunakan',
            ]);
        }



        $user->update($validatedData);

        return redirect()->route('users.index')->with('success', 'User berhasil diupdate');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User berhasil dihapus');
    }
}
