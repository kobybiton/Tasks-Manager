var tasks = [];
var completedtasks = [];

$(document).ready(function() {
	
	$.get(BASE_URL + "/get_tasks", function(response) {
		
		var data = $.parseJSON(response);
		tasks = data;

		if(tasks){
			
			$.each(tasks, function(key, task){

				var params = JSON.stringify(task);
				var tr = drawTr(task, params);									
				$('tbody').append(tr);
				checkStatus(task);	
											
			});		

			tasksCounter(tasks);

		}
	});
  
	$('#add_new_task').on('click',  function(){
		
		$("#modal").modal();
		$('#update').hide();
	});

	$('#add').on('click',  function(){

		var newTask = $.trim($("#new_task").val());
		
		if(newTask){
			$.ajax({
				type: "POST",
				url: BASE_URL + "/create_task",
				dataType: 'json',
				data: {newTask: newTask},
				headers: {
				    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				success: function(newTaskRes) {

					if (newTaskRes){	

						var params = JSON.stringify(newTaskRes);
						var tr = drawTr(newTaskRes, params)			
						$('tbody').append(tr);
						$('#modal').modal('hide');
						$("#new_task").val('');
						tasks.push(newTaskRes);
						tasksCounter(tasks);
					}
				}
			});
		}

	});		

	$('#update').on('click', function(){

		var updatedTask = $.trim($("#new_task").val());
		var id = $(this).attr('data-id');
		console.log(id)
	
		if(id && id != 'undefined'){

			$.ajax({
				type: "POST",
				url: BASE_URL + "/update_task/" + id,
				data: {updatedTask: updatedTask},
				headers: {
					    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					},				
				success: function(updatedTaskRes){
					console.log(updatedTaskRes)
					$('[data-id="' + id + '"]').children('td').eq(1).html(updatedTask);
					$('#modal').modal('hide');
				}
			});
			
		}

	});		

	$(document).on('click', '#check_task', function(){

		var is_checked = 0;
		if($(this).hasClass('checked')){
			is_checked = 0;
		} else{
			is_checked = 1;
		  }

		console.log(is_checked)  
		$(this).toggleClass("checked");
		var id = $(this).data('id');

		$.ajax({
			type: "POST",
			url: BASE_URL + "/checked_task/" + id,
			data: {is_checked: is_checked},
			headers: {
				    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},				
			success: function(checkedTaskRes){
				
			    var checkedTask = $.parseJSON(checkedTaskRes);
			    checkStatus(checkedTask);
				copmletedTasksCounter(tasks, checkedTask.is_checked);
				
			}
		});	

	});	

});

function drawTr(task, params){

	var tr = '<tr data-id="' + task.id + '">';
	tr += '<td>' + task.id + '</td>';
	tr += '<td class="text">' + task.task_name + '</td>';
	tr += '<td>' + task.created_at + '</td>';
	tr += '<td>';
	tr += "<button data-id="+ task.id +" class='btn-info update-task' onclick='updateTask("+ params + ")'>";
	tr += '<i class="fa fa-refresh" aria-hidden="true"></i>';
	tr += '</button>';
	tr += "<button data-id=" + task.id + " class='btn-danger delete-task' onclick='deleteTask("+ task.id +")'>";
	tr += '<i class="fa fa-trash-o" aria-hidden="true"></i>';
	tr += '</button>';
	tr += "<button data-id=" + task.id + " class='btn-default' id='check_task'>";
	tr += '<i class="fa fa-check" aria-hidden="true"></i>';
	tr += '</button>';	
	tr += '</td>';
	tr += '</tr>';
	return tr;
}

function deleteTask(id){

	if(id && id != 'undefined'){
		$.ajax({
			type: "POST",
			url: BASE_URL + "/delete_task/" + id,
			data: {id: id},
			headers: {
				    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},				
			success: function(deletedTask) {
				if (deletedTask && deletedTask != 'undefined'){
					console.log(tasks)
					tasks.splice($.inArray(deletedTask, tasks), 1);
					tasksCounter(tasks);					
					$('[data-id="' + id + '"]').remove();
				}
			}
		});
		
	}
	
}

function updateTask(task){

	var taskName = task.task_name;
	var id = task.id;
	$("#modal").modal();
	$('#add').hide();
	$('#update').show();
	$("#new_task").val(taskName);	
	$('#update').attr('data-id', id);	
	
}

function checkStatus(task){

	if(task.is_checked == 1){
		
		$('[data-id="' + task.id + '"]').children('td').eq(1).css('text-decoration', 'line-through');
		$('[data-id="' + task.id + '"]').children('td').eq(3).find('button').eq(2).removeClass('btn-default').addClass('btn-success checked');

	} else{

	    $('[data-id="' + task.id + '"]').children('td').eq(1).css('text-decoration', 'none');
	    $('[data-id="' + task.id + '"]').children('td').eq(3).find('button').eq(2).removeClass('btn-success').addClass('btn-default');
	  }
}

function copmletedTasksCounter(tasks, completedtask = null){

	if(completedtask != null){
		
		if(completedtask == 1){
			completedtasks.push(completedtask);
		} else{
			completedtasks.splice($.inArray(completedtask, completedtasks), 1);
	      }	
	}

	var totalCount = tasks.length;
	var completedCount = completedtasks.length;

	var remainTasks = totalCount - completedCount;
	$('#completed').html(completedCount);	
	$('#remain_tasks').html(remainTasks);
}

function tasksCounter(){

	for(var i in tasks){
		var completed = tasks[i].is_checked;
		if(completed === 1){
			completedtasks.push(completed);
		}	
	}

	var totalCount = tasks.length;
	var completedCount = completedtasks.length;

	var remainTasks = totalCount - completedCount;
	$('#total').html(totalCount);
	$('#completed').html(completedCount);	
	$('#remain_tasks').html(remainTasks);	
}