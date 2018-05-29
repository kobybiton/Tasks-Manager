
@extends('layouts.app')

@section('content')

<div class="container">
  
  <div id="tasks_status_wrapper">
    <div id="total_tasks">
      <div class="left">Total Tasks<span class="right" id="total"></span></div>
    </div> 
    <div id="tasks_completed">
      <div class="left">Tasks Completed<span class="right" id="completed"></span></div>
    </div> 
    <div id="tasks_remaining">
      <div class="left">Tasks Remaining<span class="right" id="remain_tasks"></span></div>
    </div>          
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Task Name</th>
        <th>Date</th>
        <th><button type="button" class="btn-primary" id="add_new_task">Add New Task +</button></th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <!-- Modal -->
  <div class="modal fade" id="modal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-body">
          <form role="form">
            <div class="form-group">
              <label for="newTask"><span class="glyphicon glyphicon-user"></span> New Task</label>
              <input type="text" class="form-control" id="new_task" placeholder="Enter new Task">
            </div>
            <button type="button" class="btn btn-success btn-block" id="add"><span class="glyphicon glyphicon-off"></span> Add +</button>
            <button type="button" class="btn btn-success btn-block" id="update"><span class="glyphicon glyphicon-off"></span> Update </button>
          </form>
        </div>
      </div>
      
    </div>
  </div> 
</div> 

@endsection