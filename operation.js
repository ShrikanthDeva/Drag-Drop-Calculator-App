const todos = document.querySelectorAll(".todo");
const $doneContainer = document.querySelector(".done-container");
const $operation_container = document.querySelector(".operation_container")

const first = true
const operation_dict = {'ADD':'+','SUBTRACT':'-','MULTIPLY':'*','DIVIDE':'/'}
let operation = ""
let op_num = 0
let oper = 1

const handleDrop = (e) => {
  const id = e.dataTransfer.getData("text");
  console.log(id)
  let $draggedElement = document.querySelector(`#${id}`).cloneNode(true);
  $draggedElement.id = oper;
  oper += 1
  
  console.log($draggedElement)
  $draggedElement.setAttribute("class","todo2")
  // $draggedElement = $draggedElement[0]
  document.querySelector(`#${id}`).style.backgroundColor = "#e74c3c";



  // text field
  const inp = document.createElement("INPUT")
  inp.setAttribute("type","number")
  inp.setAttribute("placeholder","Number:")
  inp.setAttribute("class","input")

  $draggedElement.removeAttribute("draggable")
  $draggedElement.setAttribute("id",op_num+1)
  $doneContainer.appendChild($draggedElement);
  op_num += 1
  $doneContainer.appendChild(inp);

  // restore operation
  // restore_operation(id)
  
  // exprn
  operation = operation.concat(operation_dict[id])
  // console.log(operation)  


  e.dataTransfer.clearData();
};

const handleDragover = (e) => {
  e.preventDefault();
};

const handleDragstart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.currentTarget.style.backgroundColor = "#f39c12";
};

todos.forEach(($todo) => {
  $todo.addEventListener("dragstart", handleDragstart);
});

$doneContainer.addEventListener("drop", handleDrop);
$doneContainer.addEventListener("dragover", handleDragover);

function isEmpty() {
  const inputs = document.querySelectorAll(".input")
  for (let i = 0; i < inputs.length; i++) {
    if ( inputs[i].value == null || inputs[i].value == "")
    {
      alert("Please Fill all the fields")
      return false
    }
  }
  return true
}


function eval_exprn() {

  if (isEmpty())
  {

    const inputs = document.querySelectorAll(".input")
    console.log(inputs)
    let exp = ''
    let val = 0
    for (let i = 0; i < inputs.length; i++) {
      // console.log(inputs[i].value) 
      exp = exp.concat(inputs[i].value)
      if (val) exp = exp + ')'
      val =  1
      if (i < inputs.length -1){
        exp = exp.concat(operation[i])
        exp = '(' + exp
      }
    }
    console.log(exp)
    console.log(eval(exp))
  
    const op = document.querySelector(".op")
    console.log(op)
    op.innerText = eval(exp)
  }


}

function reset_op() {
  location.reload()
}

function restore_operation(id) {
  const op = document.createElement('div')
  op.setAttribute('draggable','true')
  op.setAttribute('class','todo')
  op.setAttribute('id',`#${id}`)
  op.innerText = id

  $operation_container.appendChild(op)


}