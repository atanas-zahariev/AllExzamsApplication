export  function formHandlle(form,callback){
   form.addEventListener('submit',onSubmit)

   function onSubmit(ev){
    ev.preventDefault()

    const myForm = new FormData(ev.target);

    const data = Object.fromEntries(myForm.entries())

    callback(data);
   }
}