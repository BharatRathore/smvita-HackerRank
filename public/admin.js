
const fetchBtn = document.getElementById("fetch-data");
const tableBody = document.getElementById("table-body");
const fetchData=document.querySelector('.fetchdata')
const loginDiv=document.querySelector('.admin-login')
const status= document.getElementById("status")
const tablediv=document.querySelector('.table')
const stdName=document.getElementById('std-name')
const fetchStatus=document.querySelector('.fetch-status')
fetchStatus.style.display="none"
fetchData.style.display="none"
tablediv.style.display="none"
let key=""
let isLoggedIn=false
//login validations
$.ajaxSetup({ cache: false });

$('#login-form').submit(function(e){
    e.preventDefault()
    var form = $(this);
    var url = "../login";
    status.classList=[]
    status.classList.add("form-text",  "text-center","m-0")
    status.innerText = "Processing...";
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), 
      success: function (data) {
        if(data.valid){
          fetchData.style.display="block"
          loginDiv.style.display="none"
          isLoggedIn=true
          key=data.key
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







let c = 0;
fetchBtn.addEventListener("click", (e) => {
  if(isLoggedIn){
    fetchStatus.style.display="block"
    fetchBtn.style.pointerEvents = "none";
    tableBody.innerHTML = "";
    fetch("../getinfo/"+key)
      .then((data) => {
        return data.json();
      })
      .then((fulldata) => {
        
        let bdginfo = {};
        fulldata.forEach((user) => {
          
          //console.log(user);
          let tr = document.createElement("tr");
          tr.classList.add("user-row");
          if(!user.githubId){
            user["githubId"]="None"
          }
          // tr.setAttribute("data-toggle", "modal");
          // tr.setAttribute("data-target", "#exampleModal");
          tr.style.cursor="pointer"
          tr.innerHTML = `
              <td data-toggle="modal" data-target="#exampleModal">${user.prn_no}</td>
              <td data-toggle="modal" data-target="#exampleModal" class="caps">${user.full_name}</td>
              <td data-toggle="modal" data-target="#exampleModal" class="fcaps">${user.course}</td>
              <td data-toggle="modal" data-target="#exampleModal">${user.badgeInfo.totalBadges}</td>
              <td data-toggle="modal" data-target="#exampleModal">${user.badgeInfo.totalStars}</td>
              <td ><a href="https://hackerrank.com/${user.hackerRankId}" " target="_blank" id="gid">${user.hackerRankId}</a></td>
              <td ><a href="https://github.com/${user.githubId}" " target="_blank" id="gid">${user.githubId}</a></td>
              <td class="d-none">${user._id}</td>
             
             `;
          if(user.badgeInfo.totalBadges >0){
            bdginfo[user._id] = user.badgeInfo.badges;
          }
          else{
            bdginfo[user._id]={"No Badges earned...":0}
          }
          
          tableBody.appendChild(tr);
          fetchBtn.style.pointerEvents = "auto";
          
          
          tr.addEventListener("click", (e) => {
            if(e.srcElement.id!=="gid"){
              let id = $(e.target).siblings()[6].innerText;
            
            let badgeDetails=bdginfo[id]
           
            
            count=1
            let html=""
            if(badgeDetails!="no-stars"){
              Object.entries(badgeDetails).map(info=>{
                html+=`
                    <tr>
                    <td>${count++}</td>
                    <td>${info[0]}</td>
                    <td>${info[1]}</td>
                    </tr>
    
                
                `
              })
            }
            
            
            document.getElementById('bdg-body').innerHTML=html
            stdName.innerText=user.full_name
            stdName.style.textTransform="capitalize"
            }
            
            
          });
        });
      }).then(()=>{
        fetchStatus.style.display="none"
        tablediv.style.display="block"
       let x= $('.mytable').DataTable({
        dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>><'d-flex justify-content-center mt-3' B>",
        //dom:'<"d-flex justify-content-center"B><"d-flex justify-content-around mt-5"lf><t><ip>',
        buttons: [
          {
            extend: 'pdf',
            exportOptions: {
            columns: [ 0, 1, 2, 3, 4 ,5,6] //Your Colume value those you want
                }
              },
          {
         extend: 'print',
         exportOptions: {
         columns: [ 0, 1, 2, 3, 4 ,5,6] //Your Colume value those you want
             }
           },
           {
            extend: 'excel',
            exportOptions: {
            columns: [ 0, 1, 2, 3, 4,5,6 ] //Your Colume value those you want
           }
         },
       ],
          "bDestroy": true,
          order:[[0,'asc']],
          responsive:true,
          "columnDefs": [ {
            "targets": 2,
            
            "orderable": false
            } ],
            
          initComplete: function () {
            
            this.api().columns(2).every( function () {
            var column = this;
            $('.mytable .head .head_hide').html('');
    
            var select = $('<select id="formfilter" class="filterdropdown text-white bg-dark"><option value="">Course</option></select>')
                .appendTo( $(column.header()).empty())
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );
                    column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                });
    
            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
            });
        }
            )}
      
  
  
  
        })
        
        
      });
  }
  
    
});



