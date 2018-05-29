<?php

namespace App\Http\Controllers;
use App\Tasks;
use DB;

use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('tasks');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = Tasks::orderBy('id', 'asc')->get();
        return json_encode($data);        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $this->validate($request, [
            'newTask' => 'required|max:500'
        ]);        

        $tasks = new Tasks();
        $tasks->task_name = filter_var($request->input('newTask'));
        if($tasks->task_name){
          $tasks->save();
          $tasks = DB::table('tasks')->orderBy('updated_at', 'desc')->first();
          return json_encode($tasks);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tasks = Tasks::find($id);
        $tasks->task_name = $request->input('updatedTask');
        $tasks->save();
        return json_encode($tasks);
    }

    public function checked(Request $request, $id)
    {
        $tasks = Tasks::find($id);
        $tasks->is_checked = $request->input('is_checked');
        $tasks->save();
        return json_encode($tasks);
    }    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $tasks = Tasks::find($id);
        $tasks->id = $request->input('id');
        $tasks->delete();
        return json_encode($tasks);
    }
}
