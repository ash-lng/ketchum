
function _Cool_alert(message)
{
  return A2(__Task_perform, __Basics_never, __Scheduler_binding(function(callback)
  {
    alert("msg " + message);
  }));
}

