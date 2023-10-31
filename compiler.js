let a=2;
const compile=document.getElementById('com');
const lang=document.getElementById('lang');
const codewindow=document.getElementById('code');
const output=document.getElementById('output');
compile.addEventListener("click",compilecode);
function compilecode(){
    let langid=lang.value;
    let code=codewindow.value.trim();
    if(code==="")
    {
        alert("Please enter some code");
    }
    else{
        fetch("https://codequotient.com/api/executeCode",{
            method: "POST",
            headers:new Headers({
                 "Content-Type":"application/json",
            }),
            body: JSON.stringify({ code : code , langId : langid})       
        }
        ).then((res)=>
        {
            return res.json();
        }
        ).then((data)=>{
             if(data.error!==undefined)
             {
                console.log(data.error);
             }
             else{
                const interval=setInterval(()=>{
               const u="https://codequotient.com/api/codeResult/"+data.codeId;
            fetch(u)
            .then((res)=>
            {
                return res.json();
            })
            .then((a)=>{
                console.log(a);
                if(a.data)
                {
                    let data=JSON.parse(a.data);
                    console.log(data);
                    if(data.status!=="Pending")
                    {
                    if(data.errors==="")
                    {
                        output.innerHTML=data.output;
                    }
                    else{
                        output.innerHTML=data.errors;
                    }
                   clearInterval(interval);
                }
                }
            })
             },1000);
        }
    })
}
}
// codewindow.addEventListener("keyup",(e)=>{
//     if(e.key==="Enter")
//     {
//         const list=document.getElementById("line-num");
//         const li=document.createElement('li');
//         li.textContent=a;
//         list.appendChild(li);
//         a++;
//     }
// })