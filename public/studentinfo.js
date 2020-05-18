const status=document.getElementById('status')
const dashboard=document.querySelector('.dashboard')
const login=document.querySelector('.student-login')
const tbody=document.getElementById('bdg-body')
const noStars=document.getElementById('no-stars')
const stdProfile=document.getElementById('std-profile')
const updStatus=document.getElementById('update-status')
noStars.style.display="none"
let html=''
let c=1
let isLoggedIn=false

$('#student-login-form').submit(function(e){
    e.preventDefault()
    let form = $(this);
    let url = "../studentLogin";
    status.classList=[]
    status.classList.add("form-text",  "text-center","m-0")
    status.innerText = "Processing...";
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), 
      success: function (data) {
          let studentInfo=data.data
        if(data.valid){
            isLoggedIn=true
            const profileDetails=document.querySelectorAll('.edit')
            profileDetails[0].setAttribute("value",studentInfo.full_name)
            profileDetails[1].setAttribute("value",studentInfo.prn_no)
            profileDetails[2].setAttribute("value",studentInfo.hackerRankId)
            profileDetails[3].setAttribute("value",studentInfo.githubId)
            profileDetails[4].setAttribute("value",studentInfo.password)
            profileDetails[5].setAttribute("value",studentInfo._id)

            
            
            status.innerText = "";
            //console.log(data)
            dashboard.classList.toggle('d-none')
            login.style.display="none"
            //console.log(studentInfo.badgeInfo.totalBadges)
            if(studentInfo.badgeInfo.totalBadges>0){
                Object.entries(studentInfo.badgeInfo.badges).map(info=>{
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
                        <td>${studentInfo.badgeInfo.totalBadges}</td>
                        <td>${studentInfo.badgeInfo.totalStars}</td>
                        </tr>

                `
                tbody.innerHTML=html
            }
            else{
                noStars.style.display="block"
            }

        }
        else{
          status.innerText = "Wrong ID/Password";
          if(!status.classList.contains("text-danger")){
              status.classList.add("text-danger")
          }
        }
      }
  })
})




document.getElementById('save-btn').style.display="none"

function editInfo(){
    const edits=document.querySelectorAll('.edit')
    
    edits.forEach(edit=>{
        edit.removeAttribute("disabled")
    })
    document.getElementById('save-btn').style.display="inline"
}

function showHidePassword(){
    const $pwd = $("#paswd");
    if ($pwd.attr('type') === 'password') {
        $pwd.attr('type', 'text');
        document.getElementById('eye').classList.toggle("fa-eye-slash")
        document.getElementById('eye').classList.toggle("fa-eye")

    } else {
        $pwd.attr('type', 'password');
        document.getElementById('eye').classList.toggle("fa-eye-slash")
        document.getElementById('eye').classList.toggle("fa-eye")
    }
}


//Save Details

$('#save-details-form').submit(function(e){
    e.preventDefault()
    if(isLoggedIn){
        updStatus.classList=[]
        updStatus.classList.add("text-center")
        updStatus.innerText="Processing..."
        let form = $(this);
        let url = "../updatedetails";
        
        $.ajax({
            type: "PUT",
            url: url,
            data: form.serialize(),
            
            success: function (data) {
    
                if(data.valid){
                    updStatus.innerText=data.message
                    updStatus.classList=[]
                    updStatus.classList.add("text-success","text-center")
                }
                else{
                    updStatus.innerText=data.message
                    updStatus.classList=[]
                    updStatus.classList.add("text-danger","text-center")
                }
    
    
            },
            error: function(jqXHR,exception){
                console.log(jqXHR.status)
            }
        })
    }
    
})