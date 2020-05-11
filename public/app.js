const status= document.getElementById("status")
const badgeDiv=document.getElementById('badge-div')
const name=document.getElementById('bd-name')
const prn=document.getElementById('bd-prn')
const tableDiv=document.querySelector('.table-div')
badgeDiv.style.display="none";
status.style.display="none"
document.getElementById('no-stars').style.display="block"
let c=0

$("#hidform").submit(function (e) {
    
    //console.log(c)
    e.preventDefault();
    c++
    if(c==1){
        badgeDiv.style.display="none";
  status.style.display="block"
  status.classList=[]
  status.classList.add("form-text",  "text-center" ,"pt-2")
  status.innerText = "Processing...";
   // avoid to execute the actual submit of the form.

  var form = $(this);
  var url = "../saveinfo";
  
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), 
    success: function (data) {
        let tbody=document.getElementById('bdg-body')
        let html=''
        //console.log(data)
        if(data.error!=="0") {
            document.getElementById('no-stars').style.display="none"
            tableDiv.style.display="block"
            let badgeInfo=data.badges
            status.innerText = "Submitted Successfully"
            //console.log(data)
            if(status.classList.contains("text-danger")){
                status.classList.remove("text-danger")
            }
            if(!status.classList.contains("text-success")){
                status.classList.add("text-success")
            }
            let c=1
            name.innerText="Name: "+data.name
            prn.innerText="PRN no.: "+document.getElementById('prn-no').value
            
            if(data.totalBadges>0){
                Object.entries(badgeInfo).map(info=>{
                    html+=`
                        <tr>
                        <td>${c++}</td>
                        <td>${info[0]}</td>
                        <td>${info[1]}</td>
                        </tr>
    
                    
                    `
                })
                html+=`
                <tr class="table-secondary">
                        <td>Total</td>
                        <td>${data.totalBadges}</td>
                        <td>${data.totalStars}</td>
                        </tr>

                `
                tbody.innerHTML=html
            }
            else{
                tableDiv.style.display="none"
                document.getElementById('no-stars').style.display="block"
            }
            
            c=0
            
            badgeDiv.style.display="block";
            
          }  
          else{
              status.innerText=data.message
              if(status.classList.contains("text-success")){
                status.classList.remove("text-success")
            }
            if(!status.classList.contains("text-danger")){
                status.classList.add("text-danger")
            }
        }
        c=0
    },
  });
    }
    
});
